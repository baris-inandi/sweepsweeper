<script lang="ts">
	import type Coordinate from "$lib/Coordinate/Coordinate";
	import Flag from "./Flag/Flag.svelte";
	export let size: number;
	export let coordinate: Coordinate;
	export let onLeftClick: (c: Coordinate) => void;
	export let onRightClick: (c: Coordinate) => void;
	let isExploded = false;
</script>

<div class={`${(coordinate.x % 2 == 0) != (coordinate.y % 2 == 0) && "brightness-95"}`}>
	<button
		tabindex="-1"
		on:contextmenu|preventDefault={(e) => {
			onRightClick(coordinate);
		}}
		on:click|preventDefault={(e) => {
			if (coordinate.flagged) {
				onRightClick(coordinate);
				return;
			}
			if (coordinate.isMine()) {
				isExploded = true;
			}
			onLeftClick(coordinate);
		}}
		style={`height:${size}vh;width:${size}vh`}
		class={`cursor-default flex items-center justify-center
		${
			isExploded
				? "bg-orange-200"
				: coordinate.isHidden ||
				  (coordinate.flagged && coordinate.isEmpty() && !coordinate.isMine())
				? "bg-lime-300"
				: "bg-orange-100"
		}
		`}
	>
		{#if coordinate.flagged}
			<Flag {size} />
		{:else if !coordinate.isHidden}
			{#if coordinate.value > 0}
				<p
					class={[
						"text-sky-600",
						"text-lime-600",
						"text-orange-600",
						"text-purple-600",
						"text-yellow-500",
						"text-pink-600",
						"text-neutral-600",
						"text-black"
					][coordinate.value - 1]}
					style={`filter: contrast(0.7); font-size: ${
						size < 4 ? size / 2 : size / 3
					}vh; font-family: 'Press Start 2P'`}
				>
					{coordinate.value}
				</p>
			{:else if coordinate.isMine()}
				<div
					class={`rounded-full ${isExploded ? "bg-orange-600" : "bg-neutral-600"}`}
					style={`height:${size / 2.5}vh;width:${size / 2.5}vh`}
				/>
			{/if}
		{/if}
	</button>
</div>
