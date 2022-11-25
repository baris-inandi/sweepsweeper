<script lang="ts">
	import fscreen from "fscreen";
	import RaysBackground from "../shared/RaysBackground.svelte";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import BattleLogo from "../shared/BattleLogo.svelte";

	const REQUESTS_FULLSCREEN = false;
	let gameCode = "";
	let uname = "";

	$: {
		gameCode = gameCode
			.toUpperCase()
			.substring(0, 8)
			.replace(/[^A-Z0-9]/, "");
		uname = uname.substring(0, 15).replace(/[^A-Za-z0-9]/, "");
	}

	onMount(() => {
		if (REQUESTS_FULLSCREEN) {
			fscreen.requestFullscreen(document.body);
		}
	});
</script>

<RaysBackground>
	<form
		on:submit|preventDefault={() => {
			if (gameCode.length == 8 && uname.length > 2 && uname.length < 16)
				goto(`/battle/join/${gameCode}?name=${uname}`);
		}}>
		<div class="flex flex-col border-4 border-black">
			<div
				class="shadow-2xl font-game shadow-violet-900 bg-violet-600 w-fit pt-12 pb-10 px-20 text-center">
				<BattleLogo />
			</div>
			<div class="w-full text-xl font-boxy">
				<input
					bind:value={gameCode}
					placeholder="Enter Game ID"
					type="text"
					class="w-full text-center h-16 outline-none focus:border-black focus:border-4 focus:scale-110 transition-all duration-200"
					title="Ask for a game ID or host one" />
			</div>
			<div class="w-full text-xl font-boxy">
				<input
					bind:value={uname}
					placeholder="Enter nickname"
					type="text"
					class="bg-neutral-100 text-black w-full text-center h-16 outline-none focus:border-black focus:border-4 focus:scale-110 transition-all duration-200"
					title="Ask for a game ID or host one" />
			</div>
			<button
				action="submit"
				class={`w-full text-xl font-boxy text-center bg-violet-600 active:bg-violet-700 h-16 outline-none focus:border-black focus:border-4
			${
				(gameCode.length == 8 || gameCode.length == 0) &&
				((uname.length > 2 && uname.length < 16) || uname.length == 0)
					? ""
					: "saturate-50"
			} ${
				gameCode.length == 8 && uname.length > 2 && uname.length < 16
					? ""
					: "pointer-events-none"
			}
			`}>
				LET'S GO
			</button>
		</div>
	</form>
</RaysBackground>
