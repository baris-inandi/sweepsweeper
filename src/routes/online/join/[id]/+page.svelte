<script lang="ts">
	import { io, Socket } from "socket.io-client";
	// TODO: bu aslında çalışıyor, join e iki kez basılmaması gerek normal şartlarda, iki kere basarsan initial user listesi bidaha feed ediliyo array e

	let socket: Socket | undefined;
	let id = 12341234;
	let players = new Array<string>("<users>");

	const onClick = () => {
		socket = io(`localhost:3000/battle?id=${id}&name=${uname}`);

		socket?.on("game-start", (data) => {
			console.log("> game-start", data);
		});
		socket?.on("new-player", (data) => {
			console.log("> new-player", data);
			players.push(data);
			players = players;
		});
	};

	let uname = "enter name";
</script>

<input type="text" bind:value={uname} />
<button on:click={onClick}>join </button><br />
{#each players as player}
	<b>
		{player}
	</b>
	<br />
{/each}
