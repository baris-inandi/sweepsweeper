<script lang="ts">
	import { page } from "$app/stores";
	import { io } from "socket.io-client";

	const socket = io(`localhost:3000/battle?id=12341234`);

	let players = new Array<string>("<users>");

	socket.on("game-start", (data) => {
		console.log("> game-start", data);
	});

	socket.on("new-player", (data) => {
		console.log("> new-player", data);
		players.push(data);
		players = players;
	});

	let uname = "enter name";
</script>

<input type="text" bind:value={uname} />
<button
	on:click={() => {
		socket.emit("new-player", uname);
	}}
	>join
</button><br />
{#each players as player}
	{player}
{/each}
