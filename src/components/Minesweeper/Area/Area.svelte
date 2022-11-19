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

<div
	class={(coordinate.x % 2 == 0 && coordinate.y % 2 == 0) ||
	(coordinate.x % 2 != 0 && coordinate.y % 2 != 0)
		? "brightness-95 dark:brightness-90"
		: ""}
>
	<button
		on:contextmenu|preventDefault={onRightClick}
		on:click|preventDefault={onLeftClick}
		style={`height:${size}vh;width:${size}vh`}
		class={`
		transition-all duration-100 text-xs text-center flex items-center justify-center
		${
			!visible || (isFlagged && coordinate.isEmpty() && !coordinate.isMine())
				? "bg-lime-300 dark:bg-lime-900"
				: "bg-gray-100 dark:bg-neutral-800"
		}
		`}
	>
		{#if visible}
			{#if !coordinate.isEmpty()}
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
</div>
