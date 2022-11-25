import type { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import registerPlayerJoinEvents from "./registerPlayerJoinEvents/registerPlayerJoinEvents";

export default (server: HTTPServer) => {
	const io = new Server(server, {
		cors: {
			origin: true, // TODO: this might be risky
			methods: ["GET", "POST"]
		},
		pingInterval: 1000,
		pingTimeout: 4000
	});
	registerPlayerJoinEvents(io);
};
