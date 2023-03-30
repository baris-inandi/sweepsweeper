import type { Server } from "socket.io";
import $userStore from "../store/userStore";

export default (io: Server) => {
	io.of("/sw-battle-ready").on("connection", (socket) => {
		// asks for client to send message data containing room ID
		const roomID = socket.handshake.query["id"];
		if (typeof roomID == "string") {
			const readyStatus = $userStore.setPlayerReady(roomID, socket.id);
			socket.emit("confirm-ready", readyStatus);
		}
	});
};
