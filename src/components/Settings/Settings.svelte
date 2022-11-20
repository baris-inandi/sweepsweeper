<script lang="ts">
	import Slider from "@bulatdashiev/svelte-slider/src/Slider.svelte";
	import Toggle from "svelte-toggle";

	export let visible: boolean;
	export let boardSize: number;
	export let minePercentage: number;
	export let defaultBoardSize: number;
	export let defaultMinePercentage: number;
	export let isUnmuted: boolean;

	let formattedBoardSize = [boardSize];
	let formattedMinePercentage = [minePercentage];
	$: {
		boardSize = formattedBoardSize[0];
		minePercentage = formattedMinePercentage[0];
	}
</script>

<div class={visible ? "" : "hidden"}>
	<div
		style="background: rgba(10,10,10,0.5)"
		class="z-10 fixed top-0 left-0 h-screen w-screen flex items-center justify-center text-lg"
	>
		<div
			class="h-fit w-full p-10 max-w-sm bg-white border border-neutral-300 rounded-md flex flex-col justify-between"
		>
			<div class="flex flex-col gap-4">
				<div>
					<p>Board size</p>
					<div class="flex items-center justify-center gap-4">
						<Slider bind:value={formattedBoardSize} min={9} max={32} step={1} />
						<span class="w-16 text-right">
							{boardSize.toString()}
						</span>
					</div>
				</div>
				<div>
					<p>Amount of Mines</p>
					<div class="flex items-center justify-center gap-4">
						<Slider bind:value={formattedMinePercentage} min={10} max={20} step={1} />
						<span class="w-16 text-right">
							{minePercentage.toString()}%
						</span>
					</div>
				</div>
				<div class="flex justify-between items-center py-4">
					<span>Sound Effects</span>
					<Toggle
						hideLabel
						switchColor="#fff"
						toggledColor="#5784fd"
						untoggledColor="#cdcdcd"
						on=""
						off=""
						bind:toggled={isUnmuted}
					/>
				</div>
			</div>
			<div class="flex gap-3 flex-col pt-8">
				<button
					on:click={() => {
						boardSize = defaultBoardSize;
						minePercentage = defaultMinePercentage;
						isUnmuted = true;
					}}
					class="w-full p-2  text-neutral-500 rounded-md border border-neutral-300"
				>
					Reset to Defaults
				</button>
				<button
					on:click={() => {
						visible = false;
					}}
					class="w-full p-2 bg-blue-500 text-white rounded-md"
				>
					Done
				</button>
			</div>
		</div>
	</div>
</div>
