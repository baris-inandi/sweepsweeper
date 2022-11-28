<script lang="ts">
	import { io, Socket } from "socket.io-client";
	import { page } from "$app/stores";
	import RaysBackground from "../../shared/RaysBackground.svelte";
	import BattleLogo from "../../shared/BattleLogo.svelte";
	import { goto } from "$app/navigation";

	let socket: Socket | undefined;
	let players = new Array<{ name: string; flagCount: number; color: string }>();

	let ready = false;

	let uname = $page.url.searchParams.get("name") ?? "Player";
	let id = $page.params.id;
	let addr = `localhost:3000/sw-battle?join=${id}&name=${uname}`;
	if (id == "ashost") {
		addr = `localhost:3000/sw-battle?name=${uname}`;
	}
	socket = io(addr);

	const readyPlayer = () => {
		const i = "localhost:3000/sw-battle-ready?id=" + id;
		let socket = io(i);
		socket.on("confirm-ready", (status) => {
			ready = status;
		});
	};

	socket.on("generated-id-for-host", (data) => {
		id = data;
		goto(`/battle/join/${id}?name=${uname}`);
	});
	socket.on("game-start", (data) => {
		console.log("> game-start", data);
	});
	socket.on("playerlist-update", (data) => {
		console.log(data);
		players = data;
		players.reverse();
		players = players;
	});
	socket.on("invalid-id", () => {
		goto("/battle");
	});
	socket.on("console", (data) => {
		console.log(data);
	});
</script>

<RaysBackground>
	<div class="flex gap-4 flex-col justify-center items-center py-12">
		<BattleLogo />
		<div class="w-full font-game text-center text-white">
			<span class="text-sm">Game ID</span>
			<div class="select-text">
				<h3 class="text-lg">
					{id == "ashost" ? "" : id}
				</h3>
				<p class="font-sans pt-6">
					<span class="select-none"> ...or share via link: </span>
					<br />
					{`${$page.url.origin}/battle?id=${id}`}
				</p>
			</div>
			<div class="flex gap-3 font-sans justify-center items-center">
				<button class="bg-red-500 text-white px-2 py-1 mt-4">
					Leave room
				</button>
				<button
					class="bg-cyan-300 text-black px-2 py-1 mt-4"
					on:click={readyPlayer}>
					{ready ? "Unready" : "Ready"}
				</button>
			</div>
		</div>
	</div>
	<div class="border-4 border-black w-full max-w-lg h-96">
		<div class="bg-white flex flex-col overflow-scroll w-full h-full">
			{#each players as player}
				<div
					style={`background:${player.color};`}
					class="py-7 px-4 w-full border-b-4 border-black font-game text-center text-sm">
					{player.name}
				</div>
			{/each}
		</div>
		<div class="h-0">
			<div
				class="w-full h-32 -translate-y-full bg-gradient-to-t from-white to-transparent" />
		</div>
	</div>
	<p class="text-white text-sm pt-4 font-sans">
		Waiting for everyone to be ready
	</p>
</RaysBackground>
