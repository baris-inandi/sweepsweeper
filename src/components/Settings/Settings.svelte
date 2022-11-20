<script lang="ts">
	import Slider from "@bulatdashiev/svelte-slider/src/Slider.svelte";
	export let visible: boolean;
	export let boardSize: any[];
	export let minePercentage: any[];
</script>

<div class={visible ? "" : "hidden"}>
	<div
		style="background: rgba(10,10,10,0.5)"
		class="z-10 absolute h-screen w-screen flex items-center justify-center"
	>
		<div
			class="h-fit w-full p-10 max-w-sm max-h-96 bg-white border border-neutral-300 rounded-md flex flex-col justify-between"
		>
			<div class="flex flex-col gap-2">
				<div>
					<p>Board size</p>
					<div class="flex items-center justify-center gap-4">
						<Slider bind:value={boardSize} min={6} max={26} step={1} />
						<span class="w-16 text-right">
							{boardSize.toString()}
						</span>
					</div>
				</div>
				<div class="mb-10">
					<p>Amount of Mines</p>
					<div class="flex items-center justify-center gap-4">
						<Slider bind:value={minePercentage} min={5} max={35} step={1} />
						<span class="w-16 text-right">
							{minePercentage.toString()}%
						</span>
					</div>
				</div>
			</div>
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
