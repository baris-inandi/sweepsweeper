<script lang="ts">
	import type Coordinate from "$lib/MinesweeperBoard/Coordinate/Coordinate";
	import Flag from "./Flag/Flag.svelte";
	export let size: number;
	export let coordinate: Coordinate;
	export let onLeftClick: (c: Coordinate) => void;
	export let onRightClick: (c: Coordinate) => void;
	export let isFlagged: boolean;
</script>

<div
	class={(coordinate.x % 2 == 0 && coordinate.y % 2 == 0) ||
	(coordinate.x % 2 != 0 && coordinate.y % 2 != 0)
		? "brightness-95 dark:brightness-90"
		: ""}
>
	<button
		on:contextmenu|preventDefault={(e) => {
			onRightClick(coordinate);
		}}
		on:click|preventDefault={(e) => {
			onLeftClick(coordinate);
		}}
		style={`height:${size}vh;width:${size}vh`}
		class={`
		transition-all duration-100 flex items-center justify-center
		${
			coordinate.isHidden || (isFlagged && coordinate.isEmpty() && !coordinate.isMine())
				? "bg-lime-300 dark:bg-[#2c3d29]"
				: "bg-orange-50 dark:bg-neutral-800"
		}
		`}
	>
		{#if !coordinate.isHidden}
			{#if coordinate.value > 0}
				<p
					class="text-neutral-600 dark:text-neutral-500"
					style={`font-size: ${size < 4 ? size / 2 : size / 3}vh; font-family: 'Press Start 2P'`}
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
