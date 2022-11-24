import { validateID, generateID } from "../../RoomID/RoomID.ts";
import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";
import UserStore from "./UserStore/UserStore.ts";

export default class WSEventsRegister {
	// Map[roomID][userID] = <IUser>
	private userStore = new UserStore();

	constructor(private io: Server) {
		// send room id with query param `id`
		// if no `id` param is provided, a new room will be created
		// provide a uname param too
		io.of("/battle").on("connection", (socket) => {
			const roomIDPre = socket.handshake.query.get("id");
			const unamePre = socket.handshake.query.get("uname");
			const roomID =
				roomIDPre && validateID(roomIDPre) ? roomIDPre : generateID();
			const uname = unamePre || "Anonymous";

			this.userStore.registerUser(roomID, socket.id, uname);
			console.log(this.userStore);

			socket.join(roomID);

			// new player emit when they join the room
			io.to(roomID).emit("new-player", uname || "Anonymous");
			io.to(roomID).emit("playerlist-update", this.userStore.getRoom(roomID));
			socket.on("disconnect", (_) => {
				this.userStore.removeUser(roomID, socket.id);
				io.to(roomID).emit("playerlist-update", this.userStore.getRoom(roomID));
			});

			// game start event
			socket.on("start-game", (gameOptions) => {
				io.to(roomID).emit("start-game", gameOptions);
			});
		});
	}
}
