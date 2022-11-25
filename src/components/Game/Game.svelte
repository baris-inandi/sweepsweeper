<script lang="ts">
	export let vt: string;

	const DEFAULT_BOARD_SIZE = 13;
	const DEFAULT_MINE_PERCENTAGE = 12;

	import Board from "./Board/Board.svelte";

	let boardSize: number[] = [DEFAULT_BOARD_SIZE];
	let minePercentage: number[] = [DEFAULT_MINE_PERCENTAGE];
</script>

<main
	class="z-20 bg-white w-full h-full flex items-center justify-center gap-8">
	<Board
		{vt}
		size={boardSize[0]}
		minePercentage={minePercentage[0]}
		defaultBoardSize={DEFAULT_BOARD_SIZE}
		defaultMinePercentage={DEFAULT_MINE_PERCENTAGE} />
</main>
