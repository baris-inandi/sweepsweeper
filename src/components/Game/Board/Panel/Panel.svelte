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
			<span class="w-12 text-neutral-600 font-game">
				{board.numFlags}
			</span>
		</div>
	</div>
	<span class="text-neutral-600 font-game">
		{(() => {
			var date = new Date(0);
			date.setSeconds(timer);
			return date.toISOString().substring(11, 19);
		})()}
	</span>
	<div class="flex h-full items-center gap-5">
		<button
			on:click={restartCallback}
			class="text-center h-full rounded-md"
			aria-label="restart game"
			name="restart game">
			<div class="fill-neutral-600" style={`width:2.2${vt};height:2.2${vt};`}>
				<RestartIcon />
			</div>
		</button>
		<button
			aria-label="settings"
			name="settings"
			on:click={() => {
				settingsVisible = true;
			}}
			class="text-center bg-lime-700 rounded-md text-white"
			style={`padding: 1${vt} 2${vt};`}>Settings</button>
	</div>
</div>
