<script lang="ts">
	export let vt: string;

	const DEFAULT_BOARD_SIZE = 13;
	const DEFAULT_MINE_PERCENTAGE = 15;

	import Board from "./Board/Board.svelte";

	let boardSize: number[] = [DEFAULT_BOARD_SIZE];
	let minePercentage: number[] = [DEFAULT_MINE_PERCENTAGE];
</script>

<main
	class="select-none antialiased z-20 outer bg-white w-full h-full flex items-center justify-center gap-8">
	<Board
		{vt}
		size={boardSize[0]}
		minePercentage={minePercentage[0]}
		defaultBoardSize={DEFAULT_BOARD_SIZE}
		defaultMinePercentage={DEFAULT_MINE_PERCENTAGE} />
</main>
