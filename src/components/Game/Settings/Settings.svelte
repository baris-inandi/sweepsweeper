<script lang="ts">
	import Slider from "@bulatdashiev/svelte-slider/src/Slider.svelte";
	import Toggle from "svelte-toggle";
	import isMobile from "../../../lib/utils/isMobile";

	const MIN_BOARD_SIZE = 8;
	const MAX_BOARD_SIZE = 36;
	const MIN_MINE_PERCENTAGE = 10;
	const MAX_MINE_PERCENTAGE = 16;

	export let visible: boolean;
	export let boardSize: number;
	export let minePercentage: number;
	export let defaultBoardSize: number;
	export let defaultMinePercentage: number;
	export let isUnmuted: boolean;
	export let isTouchMode: boolean;

	let formattedBoardSize = [boardSize];
	let formattedMinePercentage = [minePercentage];
	$: {
		boardSize = formattedBoardSize[0];
		minePercentage = formattedMinePercentage[0];
	}
</script>

<div
	style="background: rgba(10,10,10,0.5)"
	class="fixed top-0 left-0 h-full w-full flex items-center justify-center text-lg">
	<div
		class="h-fit w-full p-10 m-4 max-w-sm bg-white border border-neutral-300 rounded-md flex flex-col justify-between">
		<div class="flex flex-col gap-4">
			<div>
				<p>Board size</p>
				<div class="flex items-center justify-center gap-6">
					<Slider
						bind:value={formattedBoardSize}
						min={MIN_BOARD_SIZE}
						max={MAX_BOARD_SIZE}
						step={1} />
					<span class="w-16 text-right">
						{boardSize + "x" + boardSize}
					</span>
				</div>
			</div>
			<div>
				<p>Amount of Mines</p>
				<div class="flex items-center justify-center gap-6">
					<Slider
						bind:value={formattedMinePercentage}
						min={MIN_MINE_PERCENTAGE}
						max={MAX_MINE_PERCENTAGE}
						step={0.1} />
					<span class="w-16 text-right">
						{minePercentage.toFixed(1)}%
					</span>
				</div>
			</div>
			<div class="flex justify-between items-center pt-3">
				<span>Sound Effects</span>
				<Toggle
					hideLabel
					switchColor="#fff"
					toggledColor="#5784fd"
					untoggledColor="#cdcdcd"
					on=""
					off=""
					bind:toggled={isUnmuted} />
			</div>
			{#if !isMobile(false)}
				<div class="flex justify-between items-center">
					<span>Touch Mode</span>
					<Toggle
						hideLabel
						switchColor="#fff"
						toggledColor="#5784fd"
						untoggledColor="#cdcdcd"
						on=""
						off=""
						bind:toggled={isTouchMode} />
				</div>
			{/if}
		</div>
		<div class="flex gap-3 flex-col pt-8">
			<button
				name="reset all settings to default"
				aria-label="reset all settings to default"
				on:click={() => {
					visible = false;
					boardSize = defaultBoardSize;
					minePercentage = defaultMinePercentage;
					isUnmuted = true;
				}}
				class="w-full p-2  text-neutral-500 rounded-md border border-neutral-300">
				Reset to Defaults
			</button>
			<button
				name="exit settings"
				aria-label="exit settings"
				on:click={() => {
					visible = false;
				}}
				class="w-full p-2 bg-blue-500 text-white rounded-md">
				Done
			</button>
		</div>
	</div>
</div>
