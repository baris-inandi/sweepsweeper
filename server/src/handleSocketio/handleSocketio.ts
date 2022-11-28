import type { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import registerPlayerConnectDisconnectEvents from "./registerPlayerConnectDisconnectEvents/registerPlayerConnectDisconnectEvents";
import registerPlayerRoomAvailabilityEvents from "./registerPlayerRoomAvailabilityEvents/registerPlayerRoomAvailabilityEvents";
import registerPlayerRoomReadyEvents from "./registerPlayerRoomReadyEvents/registerPlayerRoomReadyEvents";

export default (server: HTTPServer) => {
	const io = new Server(server, {
		cors: {
			origin: true, // TODO: this might be risky
			methods: ["GET", "POST"]
		},
		pingInterval: 1000,
		pingTimeout: 4000
	});
	registerPlayerConnectDisconnectEvents(io);
	registerPlayerRoomAvailabilityEvents(io);
	registerPlayerRoomReadyEvents(io);
};
