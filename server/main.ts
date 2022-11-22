import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";

const io = new Server({
	cors: {
		origin: true, // TODO: this might be risky
		methods: ["GET", "POST"]
	},
	pingInterval: 1000,
	pingTimeout: 4000
});

io.of(/^\/online-vs-\d+$/).on("connection", (socket) => {
	console.log(`socket ${socket.id} connected on a room`);

	socket.on("disconnect", (reason) => {
		socket.emit("message", reason);
		console.log(`socket ${socket.id} disconnected due to ${reason}`);
	});
});

io.on("message", (message) => {
	console.log(message);
});

if (import.meta.main) {
	await serve(io.handler(), {
		port: 3000
	});
}
