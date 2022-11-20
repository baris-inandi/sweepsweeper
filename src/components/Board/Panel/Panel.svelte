<script lang="ts">
	import MinesweeperBoard from "$lib/MinesweeperBoard";
	import Flag from "../../Area/Flag/Flag.svelte";
	import RestartIcon from "./RestartIcon.svelte";
	export let vh: number;
	export let size: number;
	export let timer: number;
	export let settingsVisible: boolean;
	export let board: MinesweeperBoard;
	export let minePercentage: number;
	export let boardStyleStateForGameEndings: string;
	export let finalMessage: string;
	export let restartCallback: () => void;
	export let resetTimer: () => void;
</script>

<div class="my-4 flex justify-between items-center" style={`width:${vh * size}vh;`}>
	<div>
		<div class="flex gap-4 items-center">
			<Flag size={7} />
			<span class="w-12 text-md text-neutral-600" style="font-family: 'Press Start 2P';">
				{board.numFlags}
			</span>
		</div>
	</div>
	<span class="text-md text-neutral-600" style="font-family: 'Press Start 2P';">
		{(() => {
			var date = new Date(0);
			date.setSeconds(timer);
			return date.toISOString().substring(11, 19);
		})()}
	</span>
	<div class="flex h-full items-center gap-6 text-lg">
		<button
			on:click={() => {
				board = new MinesweeperBoard(size, minePercentage, null);
				boardStyleStateForGameEndings = "";
				finalMessage = "";
				resetTimer();
				restartCallback();
			}}
			class="text-center h-full rounded-md"
		>
			<div class="fill-neutral-600 h-6 w-6">
				<RestartIcon />
			</div>
		</button>
		<button
			on:click={() => {
				settingsVisible = true;
			}}
			class="px-5 py-2 text-center bg-lime-600 rounded-md text-white font-medium">Settings</button
		>
	</div>
</div>
