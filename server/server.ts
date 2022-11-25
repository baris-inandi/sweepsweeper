import WebSocketHandler from "./WebSocketHandler/WebSocketHandler.ts";

if (import.meta.main) {
	const ws = new WebSocketHandler();
	ws.serve();
}
