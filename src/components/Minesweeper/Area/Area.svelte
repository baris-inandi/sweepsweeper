<script lang="ts">
	import type Coordinate from "$lib/MinesweeperBoard/Coordinate/Coordinate";
	import Flag from "./Flag/Flag.svelte";
	export let size: number;
	export let coordinate: Coordinate;
	export let visible: boolean;
	export let isFlagged: boolean;

	async function onRightClick(e: Event) {
		// console.log(e);
	}
	async function onLeftClick(e: Event) {
		// console.log(e);
	}
</script>

<button
	on:contextmenu|preventDefault={onRightClick}
	on:click|preventDefault={onLeftClick}
	style={`height:${size}vh;width:${size}vh`}
	class={`
	transition-all duration-100 text-xs border text-center flex items-center justify-center dark:border-black
	border-gray-300 bg-gray-100 dark:bg-neutral-800
	${
		!(coordinate.isMine() || coordinate.value > 0) &&
		visible &&
		"hover:brightness-105 dark:hover:brightness-125 cursor-pointer"
	}`}
>
	{#if visible}
		{#if coordinate.value > 0}
			<p
				class="text-neutral-600 dark:text-neutral-500"
				style={`font-size: ${size < 4 ? size / 2 : size / 4}vh; font-family: 'Press Start 2P'`}
			>
				{coordinate.value}
			</p>
		{:else if coordinate.isMine()}
			<div
				class="rounded-full bg-neutral-600 dark:bg-neutral-500"
				style={`height:${size / 2.5}vh;width:${size / 2.5}vh`}
			/>
		{:else if isFlagged}
			<Flag {size} />
		{/if}
	{/if}
</button>
