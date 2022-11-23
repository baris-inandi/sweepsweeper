<script lang="ts">
	import { customAlphabet } from "nanoid";
	import { io, Socket } from "socket.io-client";
	let uname = "enter a name";
	let difficulty = "medium";

	const ID = () => {
		const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const nanoid = customAlphabet(alphabet, 8);
		return nanoid();
	};

	const id = "12341234"; // TODO
</script>

{id}
<br />
<input type="text" bind:value={uname} />
<input type="text" bind:value={difficulty} />
<br />
<button
	on:click={() => {
		const socket = io(`localhost:3000/ms-online-${id}`);
		console.log("connected");
		socket.emit("new-player", uname);
		socket.emit("start-game", {
			difficulty
		});
	}}
	>join
</button>
