import { validateID, generateID } from "./roomID/roomID";
import type { Server } from "socket.io";
import UserStore from "./UserStore/UserStore";

// Map[roomID][userID] = <IUser>
const userStore = new UserStore();

export default (io: Server) => {
	// send room id with query param `id`
	// if no `id` param is provided, a new room will be created
	// provide a uname param too
	io.of("/ms-battle").on("connection", (socket) => {
		const getParams = () => {
			const roomIDPre = socket.handshake.query["join"];
			const unamePre = socket.handshake.query["name"];
			const roomID = (() => {
				if (roomIDPre === undefined) {
					return generateID();
				} else {
					const roomIDString = Array.isArray(roomIDPre)
						? roomIDPre.join("")
						: roomIDPre;
					if (validateID(roomIDString)) {
						return roomIDString;
					} else {
						socket.emit("invalid-id");
						socket.disconnect();
					}
				}
			})();
			const uname = unamePre ? unamePre.toString() : "Anonymous";
			return { roomID, uname };
		};
		const { roomID, uname } = getParams();

		// create user
		// send all sockets a playerlist update
		userStore.registerUser(roomID, socket, uname);
		console.log(uname, "joined", roomID);
		userStore.emitForRoom(
			roomID,
			"playerlist-update",
			userStore.getUsersInRoom(roomID)
		);

		// new player emit when they join the room
		socket.on("disconnect", (_) => {
			userStore.removeUser(roomID, socket.id);
			userStore.emitForRoom(
				roomID,
				"playerlist-update",
				userStore.getUsersInRoom(roomID)
			);
		});

		// game start event
		socket.on("start-game", (gameOptions) => {
			userStore.emitForRoom(roomID, "start-game", gameOptions);
		});
	});
};
