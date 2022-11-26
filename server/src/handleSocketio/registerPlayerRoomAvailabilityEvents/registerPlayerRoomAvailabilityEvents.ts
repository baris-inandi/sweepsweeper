import type { Server } from "socket.io";
import $userStore from "../store/userStore";

export default (io: Server) => {
	io.of("/sw-battle-pre-join").on("connection", (socket) => {
		// asks for client to send message data containing room ID
		const roomID = socket.handshake.query["id"];
		let status = { joinable: false, error: "Something went wrong" };
		if (typeof roomID === "string") status = $userStore.isJoinableAt(roomID);
		socket.emit("pre-join-answer-joinable", status);
	});
};
