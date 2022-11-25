<script lang="ts">
	import { io, Socket } from "socket.io-client";
	import { page } from "$app/stores";
	import RaysBackground from "../../../../components/Battle/shared/RaysBackground.svelte";
	import BattleLogo from "../../../../components/Battle/shared/BattleLogo.svelte";

	// TODO: bu aslında çalışıyor, join e iki kez basılmaması gerek normal şartlarda, iki kere basarsan initial user listesi bidaha feed ediliyo array e

	let socket: Socket | undefined;
	let players = new Array<{ name: string; flagCount: number; color: string }>();

	let name = $page.url.searchParams.get("name");
	let id = "3S20FKU7";
	let addr = `localhost:3000/ms-battle?join=${id}&name=${name}`;
	console.log(addr);
	socket = io(addr);

	socket?.on("game-start", (data) => {
		console.log("> game-start", data);
	});
	socket?.on("playerlist-update", (data) => {
		console.log(data);
		players = data[0];
		players.reverse();
		players = players;
	});
	socket?.on("console", (data) => {
		console.log(data);
	});
</script>

<RaysBackground>
	<div class="flex gap-4 flex-col justify-center items-center py-12">
		<BattleLogo />
		<div class="w-full font-game text-center text-white">
			<span class="text-sm">Game ID</span>
			<h3 class="text-lg">
				{id}
			</h3>
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
		Waiting for host to start the game...
	</p>
</RaysBackground>
