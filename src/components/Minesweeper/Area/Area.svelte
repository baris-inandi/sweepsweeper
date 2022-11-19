<script lang="ts">
	import type Coordinate from "$lib/MinesweeperBoard/Coordinate/Coordinate";
	import Flag from "./Flag/Flag.svelte";
	export let size: number;
	export let coordinate: Coordinate;
	export let onLeftClick: (c: Coordinate) => void;
	export let onRightClick: (c: Coordinate) => void;
</script>

<div
	class={(coordinate.x % 2 == 0 && coordinate.y % 2 == 0) ||
	(coordinate.x % 2 != 0 && coordinate.y % 2 != 0)
		? "brightness-95"
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
			coordinate.isHidden || (coordinate.flagged && coordinate.isEmpty() && !coordinate.isMine())
				? "bg-lime-300"
				: "bg-orange-50"
		}
		`}
	>
		{#if coordinate.flagged}
			<Flag {size} />
		{:else if !coordinate.isHidden}
			{#if coordinate.value > 0}
				<p
					class="text-neutral-600"
					style={`font-size: ${size < 4 ? size / 2 : size / 3}vh; font-family: 'Press Start 2P'`}
				>
					{coordinate.value}
				</p>
			{:else if coordinate.isMine()}
				<div
					class="rounded-full bg-neutral-600"
					style={`height:${size / 2.5}vh;width:${size / 2.5}vh`}
				/>
			{/if}
		{/if}
	</button>
</div>
