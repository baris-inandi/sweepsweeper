import { validateID, generateID } from "../../RoomID/RoomID.ts";
import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";
import UserStore from "./UserStore/UserStore.ts";

export default class WSEventsRegisterPlayerJoins {
	// Map[roomID][userID] = <IUser>
	private userStore = new UserStore();
	public io: Server;

	constructor(_io: Server) {
		// send room id with query param `id`
		// if no `id` param is provided, a new room will be created
		// provide a uname param too
		this.io = _io;
		this.io.of("/ms-battle").on("connection", (socket) => {
			const roomIDPre = socket.handshake.query.get("join");
			const unamePre = socket.handshake.query.get("name");
			const roomID =
				roomIDPre && validateID(roomIDPre) ? roomIDPre : generateID();
			const uname = unamePre || "Anonymous";

			// create user
			// send all sockets a playerlist update
			this.userStore.registerUser(roomID, socket, uname);
			console.log("new mf just joined to room", roomID);
			this.userStore.emitForRoom(
				roomID,
				"playerlist-update",
				this.userStore.getRoom(roomID)
			);

			// new player emit when they join the room
			socket.on("disconnect", (_) => {
				this.userStore.removeUser(roomID, socket.id);
				this.userStore.emitForRoom(
					roomID,
					"playerlist-update",
					this.userStore.getRoom(roomID)
				);
			});

			// game start event
			socket.on("start-game", (gameOptions) => {
				this.userStore.emitForRoom(roomID, "start-game", gameOptions);
			});
		});
	}
}
