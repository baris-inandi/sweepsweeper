import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";
import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import WSEventsHandler from "./WSEventsRegister/WSEventsRegister.ts";

const PORT = 3000;

export default class WebSocketHandler {
	public io = new Server({
		cors: {
			origin: true, // TODO: this might be risky
			methods: ["GET", "POST"]
		},
		pingInterval: 1000,
		pingTimeout: 4000
	});

	private events = new WSEventsHandler(this.io);

	public async serve() {
		await serve(this.io.handler(), {
			port: PORT
		});
	}
}
