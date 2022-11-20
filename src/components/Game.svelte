<script lang="ts">
	const DEFAULT_BOARD_SIZE = 13;
	const DEFAULT_MINE_PERCENTAGE = 15;

	import Board from "./Board/Board.svelte";

	let boardSize: number[] = [DEFAULT_BOARD_SIZE];
	let minePercentage: number[] = [DEFAULT_MINE_PERCENTAGE];
</script>

<main class="select-none antialiased">
	<div class="w-screen h-screen flex items-center justify-center gap-8">
		<Board
			size={boardSize[0]}
			minePercentage={minePercentage[0]}
			defaultBoardSize={DEFAULT_BOARD_SIZE}
			defaultMinePercentage={DEFAULT_MINE_PERCENTAGE}
		/>
	</div>
</main>
