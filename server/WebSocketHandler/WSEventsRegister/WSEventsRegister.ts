import { validateID, generateID } from "../../RoomID/RoomID.ts";
import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";

export default class WSEventsRegister {
	constructor(private io: Server) {
		// send room id with query param `id`
		// if no `id` param is provided, a new room will be created
		// provide a uname param too
		io.of("/battle").on("connection", (socket) => {
			const roomID = socket.handshake.query.get("id");
			const uname = socket.handshake.query.get("uname");
			socket.join(roomID && validateID(roomID) ? roomID : generateID());

			// new player emit when they join the room
			socket.broadcast.emit("new-player", uname || "Anonymous");
			socket.on("new-player", (name: string) => {
				socket.broadcast.emit("new-player", name);
			});
			socket.on("disconnect", (reason) => {
				socket.broadcast.emit("disconnected-player", reason);
			});

			// game start event
			socket.on("start-game", (gameOptions) => {
				socket.broadcast.emit("start-game", gameOptions);
			});
		});
	}
}
