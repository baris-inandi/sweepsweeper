<script lang="ts">
	import { goto } from "$app/navigation";
	import { io } from "socket.io-client";
	import { slide } from "svelte/transition";

	export let forJoin = false;
	export let forHost = false;
	export let presetID = "";
	let err = "";
	let uname = "";
	let gameCode = presetID;

	let submitCallback = () => {};
	if (forJoin) {
		submitCallback = () => {
			let socket = io(`localhost:3000/sw-battle-pre-join?id=${gameCode}`);
			socket.on("pre-join-answer-joinable", (response) => {
				if (response.joinable) goto(`/battle/join/${gameCode}?name=${uname}`);
				socket.close();
				err = response.error;
			});
		};
	}
	if (forHost) {
		submitCallback = () => {
			let socket = io(`localhost:3000/sw-battle-pre-join-host`);
			socket.on("host-id")
			goto(`/battle/join/${id}?name=${uname}`);
		};
	}

	$: {
		gameCode = gameCode
			.toUpperCase()
			.substring(0, 8)
			.replace(/[^A-Z0-9]/, "");
		uname = uname.substring(0, 15).replace(/[^A-Za-z0-9]/, "");
	}
</script>

<form on:submit|preventDefault={submitCallback}>
	<div class="flex flex-col border-4 border-black">
		{#if !forHost}
			<div class="w-full text-xl font-boxy">
				<input
					bind:value={gameCode}
					placeholder="Enter Game ID"
					type="text"
					class="w-full text-center h-16 outline-none focus:border-black border-white border-4 m-0 rounded-none focus:scale-110 transition-all duration-200"
					title="Ask for a game ID or host one" />
			</div>
		{/if}
		<div class="w-full text-xl font-boxy">
			<input
				bind:value={uname}
				placeholder="Enter nickname"
				type="text"
				class="bg-violet-400 placeholder-black text-black w-full text-center h-16 outline-none focus:border-black border-violet-400 border-4 m-0 rounded-none focus:scale-110 transition-all duration-200"
				title="Ask for a game ID or host one" />
		</div>
		<button
			action="submit"
			class={`w-full text-xl font-boxy text-center bg-violet-500 active:bg-violet-700 h-16 outline-none focus:border-black border-violet-500 border-4 m-0 rounded-none focus:scale-110 transition-all duration-200
			${
				(gameCode.length == 8 || gameCode.length == 0 || forHost) &&
				((uname.length > 2 && uname.length < 16) || uname.length == 0)
					? ""
					: "saturate-50"
			} ${
				(gameCode.length == 8 || forHost) &&
				uname.length > 2 &&
				uname.length < 16
					? ""
					: "pointer-events-none"
			}
			`}>
			{#if forHost}
				CREATE GAME!
			{:else}
				LET'S GO!
			{/if}
		</button>
	</div>
	{#if err}
		<div transition:slide class="w-full pt-4 text-center">
			<span class="bg-red-500 text-white py-1 px-2">
				{err}
			</span>
		</div>
	{/if}
</form>
