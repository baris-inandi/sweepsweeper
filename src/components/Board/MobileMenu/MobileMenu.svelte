<script lang="ts">
	import type Coordinate from "$lib/Coordinate/Coordinate";

	export let coordinate: Coordinate;
	export let onReveal: (coordinate: Coordinate) => void;
	export let onFlag: (coordinate: Coordinate) => void;

	const act = (isFlagging: boolean) => {
		if (isFlagging) {
			onFlag(coordinate);
		} else {
			onReveal(coordinate);
		}
	};
</script>

<div class="h-fit w-full">
	<div class="flex pb-2">
		<button
			on:click={() => {
				act(false);
			}}
			class="font-medium border border-cyan-500 text-white bg-cyan-400 active:bg-cyan-500 w-full px-2 py-3"
			>Reveal</button>
		<button
			on:click={() => {
				act(true);
			}}
			class="font-medium border border-orange-500 text-white bg-orange-400 active:bg-orange-500 w-full px-2 py-3"
			>Flag</button>
	</div>
</div>
