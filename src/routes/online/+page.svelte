<script lang="ts">
	import { io } from "socket.io-client";
	const socket = io("localhost:3000");

	let msg = "";

	socket.connect();
	socket.on("connect", () => {
		msg += "Connected to server\n";
	});

	socket.on("message", (data) => {
		msg += data + "\n";
		console.log(msg);
	});

	socket.send("message");
</script>

<div>{msg}</div>
