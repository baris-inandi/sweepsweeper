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
	<div class="flex pt-3 gap-3">
		<button
			name="reveal selected cell"
			aria-label="reveal selected cell"
			on:click={() => {
				act(false);
			}}
			class="font-medium text-white bg-cyan-700 active:bg-cyan-800 w-full px-1 py-5 font-boxy text-lg"
			>Reveal</button>
		<button
			name="flag selected cell"
			aria-label="flag selected cell"
			on:click={() => {
				act(true);
			}}
			class="font-medium text-white bg-red-500 active:bg-red-700 w-full px-1 py-5 font-boxy text-lg"
			>Flag</button>
	</div>
</div>
