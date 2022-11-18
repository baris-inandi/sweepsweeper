<script lang="ts">
	import Flag from "./Flag/Flag.svelte";
	export let size: number;
	export let state: string; // flagged, exploded, number, empty, grass
	export let num: number; // displayed if state is "number"
</script>

<div
	style={`height:${size}vh;width:${size}vh`}
	class={`transition-all duration-100 text-xs outline outline-2 text-center flex items-center justify-center hover:brightness-105 dark:outline-black
	${
		state == "empty" || state == "number" || state == "exploded"
			? "outline-gray-300 bg-gray-100 dark:bg-neutral-800"
			: state == "flagged"
			? "outline-orange-200 bg-orange-100 dark:bg-orange-900"
			: // grass
			  "outline-lime-300 bg-lime-100 dark:bg-lime-900"
	}
	`}
>
	{#if state == "number"}
		<p class="text-gray-600 dark:text-neutral-500" style={`font-size: ${size / 5}vh; font-family: 'Press Start 2P'`}>
			{num}
		</p>
	{:else if state == "flagged"}
		<Flag {size} />
	{/if}
</div>
