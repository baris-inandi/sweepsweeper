<script lang="ts">
	const DEFAULT_BOARD_SIZE = 13;
	const DEFAULT_MINE_PERCENTAGE = 15;

	import Board from "./Board/Board.svelte";
	import Settings from "./Settings/Settings.svelte";

	let boardSize: number[] = [DEFAULT_BOARD_SIZE];
	let minePercentage: number[] = [DEFAULT_MINE_PERCENTAGE];
	let settingsVisible = false;
</script>

<main class="select-none antialiased">
	<Settings
		bind:visible={settingsVisible}
		bind:boardSize
		bind:minePercentage
		defaultBoardSize={DEFAULT_BOARD_SIZE}
		defaultMinePercentage={DEFAULT_MINE_PERCENTAGE}
	/>
	<div class="w-screen h-screen flex items-center justify-center gap-8">
		<Board bind:settingsVisible size={boardSize[0]} minePercentage={minePercentage[0]} />
	</div>
</main>
