<script lang="ts">
	import Flag from "./Flag/Flag.svelte";
	export let size: number;
	export let state: string; // flagged, exploded, number, empty
	export let num: number; // displayed if state is "number"
	export let visible: boolean;
</script>

<div
	style={`height:${size}vh;width:${size}vh`}
	class={`transition-all duration-100 text-xs outline outline-2 text-center flex items-center justify-center dark:outline-black
	${
		!(state == "exploded" || state == "number") &&
		visible &&
		"hover:brightness-105 dark:hover:brightness-125 cursor-pointer"
	}
	${
		visible
			? state == "flagged"
				? "outline-orange-200 bg-orange-100 dark:bg-yellow-900"
				: "outline-gray-300 bg-gray-100 dark:bg-neutral-800"
			: // grass, hidden
			  "outline-lime-300 bg-lime-100 dark:bg-teal-900"
	}
	`}
>
	{#if visible}
		{#if state == "number"}
			<p
				class="text-gray-600 dark:text-neutral-500"
				style={`font-size: ${size < 4 ? size / 2 : size / 5}vh; font-family: 'Press Start 2P'`}
			>
				{num}
			</p>
		{:else if state == "exploded"}
			<div
				class="rounded-full bg-neutral-600 dark:bg-orange-900 dark:outline dark:outline-orange-800"
				style={`height:${size / 2.5}vh;width:${size / 2.5}vh`}
			/>
		{:else if state == "flagged"}
			<Flag {size} />
		{/if}
	{/if}
</div>
