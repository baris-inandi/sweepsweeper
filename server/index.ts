import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";

const io = new Server({
	cors: {
		origin: ["localhost:5173", "localhost:3000"],
		methods: ["GET", "POST"]
	}
});

io.on("connection", (socket) => {
	console.log(`socket ${socket.id} connected`);

	socket.emit("hellox", "world");

	socket.on("disconnect", (reason) => {
		console.log(`socket ${socket.id} disconnected due to ${reason}`);
	});
});

io.on("message", (message) => {
	console.log(message);
});

await serve(io.handler(), {
	port: 3000
});
