<script lang="ts">
	import { page } from "$app/stores";
	import { io } from "socket.io-client";

	const socket = io(`localhost:3000/ms-online-${$page.params.id}`);

	socket.connect();
	socket.on("connect", () => {
		console.log("connected");
	});

	socket.on("message", (data) => {
		console.log("data received: " + data);
	});

	socket.send("message");
</script>
