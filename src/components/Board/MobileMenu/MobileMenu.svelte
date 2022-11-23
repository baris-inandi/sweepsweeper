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
			class="font-medium border border-lime-300 text-lime-700 bg-lime-100 active:bg-lime-200 w-full px-2 py-3 rounded-bl-md"
			>Reveal</button>
		<button
			on:click={() => {
				act(true);
			}}
			class="font-medium border border-orange-200 text-orange-700 bg-orange-100 active:bg-orange-200 w-full px-2 py-3 rounded-br-md"
			>Flag</button>
	</div>
</div>
