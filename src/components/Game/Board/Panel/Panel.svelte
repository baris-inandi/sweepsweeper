<script lang="ts">
	import type MinesweeperBoard from "$lib/MinesweeperBoard";
	import Flag from "../../Area/Flag/Flag.svelte";
	import RestartIcon from "./RestartIcon.svelte";
	export let vv: number;
	export let vt: string;
	export let size: number;
	export let timer: number;
	export let settingsVisible: boolean;
	export let board: MinesweeperBoard;
	export let restartCallback: () => void;
</script>

<div
	class="my-4 flex justify-between items-center"
	style={`width:${vv * size}${vt};font-size:max(1.6${vt}, 10px);`}>
	<div>
		<div class="flex gap-4 items-center">
			<Flag {vt} vv={7} />
			<span class="w-12 text-neutral-600 game-font">
				{board.numFlags}
			</span>
		</div>
	</div>
	<span class="text-neutral-600 game-font">
		{(() => {
			var date = new Date(0);
			date.setSeconds(timer);
			return date.toISOString().substring(11, 19);
		})()}
	</span>
	<div class="flex h-full items-center gap-5">
		<button on:click={restartCallback} class="text-center h-full rounded-md">
			<div class="fill-neutral-600" style={`width:2.2${vt};height:2.2${vt};`}>
				<RestartIcon />
			</div>
		</button>
		<button
			on:click={() => {
				settingsVisible = true;
			}}
			class="text-center bg-lime-600 rounded-md text-white font-medium"
			style={`padding: 1${vt} 2${vt};`}>Settings</button>
	</div>
</div>
