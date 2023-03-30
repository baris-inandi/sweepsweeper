import type { Server } from "socket.io";
import $userStore from "../store/userStore";

const roomIDGenerator = (
	roomIDPre: string | string[] | undefined,
	socket: any,
) => {
	if (typeof roomIDPre === "undefined" || roomIDPre === null) {
		socket.disconnect();
		return "";
	} else {
		const roomIDString = Array.isArray(roomIDPre)
			? roomIDPre.join("")
			: roomIDPre;
		if ($userStore.isJoinableAt(roomIDString).joinable) return roomIDString;
		else {
			socket.disconnect();
			return "";
		}
	}
};

export default (io: Server) => {
	// send room id with query param `id`
	// if no `id` param is provided, a new room will be created
	// provide a uname param too
	io.of("/sw-battle").on("connection", (socket) => {
		const getParams = () => {
			const roomIDPre = socket.handshake.query["join"];
			const unamePre = socket.handshake.query["name"];
			const roomID = roomIDGenerator(roomIDPre, socket);
			const uname = unamePre ? unamePre.toString() : "player";
			return { roomID, uname };
		};
		const { roomID, uname } = getParams();

		// create user
		// send all sockets a playerlist update
		console.log(uname, "joined", roomID);
		$userStore.registerUser(roomID, socket, uname);
		$userStore.emitForRoom(
			roomID,
			"playerlist-update",
			$userStore.getUsersInRoom(roomID),
		);

		// new player emit when they join the room
		socket.on("disconnect", (_) => {
			$userStore.removeUser(roomID, socket.id);
			$userStore.emitForRoom(
				roomID,
				"playerlist-update",
				$userStore.getUsersInRoom(roomID),
			);
			if ($userStore.getUsersInRoom(roomID).length <= 0)
				$userStore.innerStore.delete(roomID);
		});
	});
};
