<script lang="ts">
	const DEFAULT_BOARD_SIZE = 13;
	const DEFAULT_MINE_PERCENTAGE = 15;

	import Board from "./Board/Board.svelte";

	let boardSize: number[] = [DEFAULT_BOARD_SIZE];
	let minePercentage: number[] = [DEFAULT_MINE_PERCENTAGE];
</script>

<main class="select-none antialiased">
	<div
		class="z-50 outer bg-white w-screen h-screen hidden sm:flex items-center justify-center gap-8">
		<Board
			size={boardSize[0]}
			minePercentage={minePercentage[0]}
			defaultBoardSize={DEFAULT_BOARD_SIZE}
			defaultMinePercentage={DEFAULT_MINE_PERCENTAGE} />
	</div>
	<div
		class="z-10 warning w-screen h-screen text-neutral-600 sm:hidden flex items-center justify-center text-center px-8">
		You need a bigger screen to play Minesweeper.
	</div>
</main>

<style scoped>
	@media (max-height: 500px) {
		.outer {
			display: none;
		}
		.warning {
			display: flex;
		}
	}
</style>
