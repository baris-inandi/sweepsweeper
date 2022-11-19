<script lang="ts">
	const DEFAULT_BOARD_SIZE = 13;
	const DEFAULT_MINE_PERCENTAGE = 15;

	import Board from "./Board/Board.svelte";
	import Slider from "@bulatdashiev/svelte-slider/src/Slider.svelte";

	let boardSize: number[] = [DEFAULT_BOARD_SIZE];
	let minePercentage: number[] = [DEFAULT_MINE_PERCENTAGE];

	let settingsVisible = true;
</script>

<div class={settingsVisible ? "" : "hidden"}>
	<div
		style="background: rgba(10,10,10,0.33)"
		class="z-10 absolute h-screen w-screen flex items-center justify-center"
	>
		<div
			class="h-full w-full p-10 max-w-sm max-h-96 bg-white border border-neutral-300 rounded-md flex flex-col justify-between"
		>
			<div class="flex flex-col gap-2">
				<div>
					<p>Board size</p>
					<div class="flex items-center justify-center gap-4">
						<Slider bind:value={boardSize} min={9} max={32} step={1} />
						{boardSize.toString()}
					</div>
				</div>
				<div>
					<p>Amount of Mines</p>
					<div class="flex items-center justify-center gap-4">
						<Slider bind:value={minePercentage} min={5} max={30} step={1} />
						{minePercentage.toString()}%
					</div>
				</div>
			</div>
			<button
				on:click={() => {
					settingsVisible = false;
				}}
				class="w-full p-2 bg-blue-500 text-white rounded-md"
			>
				Done
			</button>
		</div>
	</div>
</div>

<div class="select-none w-screen h-screen flex items-center justify-center gap-8">
	<Board size={boardSize[0]} minePercentage={minePercentage[0]} />
</div>
