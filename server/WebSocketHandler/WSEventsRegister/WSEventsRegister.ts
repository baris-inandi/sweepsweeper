import { validateID, generateID } from "../../RoomID/RoomID.ts";
import IUser from "./IUser.ts";
import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";

export default class WSEventsRegister {
	constructor(private io: Server) {
		// send room id with query param `id`
		// if no `id` param is provided, a new room will be created
		// provide a uname param too
		const userStore = new Map<string, IUser>();
		io.of("/battle").on("connection", (socket) => {
			const roomIDPre = socket.handshake.query.get("id");
			const unamePre = socket.handshake.query.get("uname");
			const roomID =
				roomIDPre && validateID(roomIDPre) ? roomIDPre : generateID();
			const uname = unamePre || "Anonymous";

			userStore.set(socket.id, {
				name: uname,
				flagCount: 0
			});
			console.log(userStore);

			socket.join(roomID);

			// new player emit when they join the room
			socket.broadcast.emit("new-player", uname || "Anonymous");
			userStore.forEach((v, _) => {
				socket.emit("new-player", v.name);
			});
			socket.on("disconnect", (reason) => {
				io.to(roomID).emit("disconnected-player", reason);
				userStore.delete(socket.id);
			});

			// game start event
			socket.on("start-game", (gameOptions) => {
				socket.broadcast.emit("start-game", gameOptions);
			});
		});
	}
}
