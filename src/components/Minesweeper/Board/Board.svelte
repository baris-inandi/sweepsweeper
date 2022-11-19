<script lang="ts">
	import Board from "$lib/MinesweeperBoard/Board";
	import Coordinate from "$lib/MinesweeperBoard/Coordinate/Coordinate";
	import Area from "../Area/Area.svelte";
	export let size: number;
	export const vh = (size > 9 ? 60 : 50) / size;
	export let board = new Board(size, new Coordinate(1, 1, 0));
	console.log(board.toString());
</script>

<div class="select-none w-screen h-screen dark:bg-neutral-900 flex items-center justify-center">
	<div style={`grid-template-columns: repeat(${size}, minmax(0, 1fr));`} class="grid w-fit">
		{#each Array(size) as _, i}
			{#each Array(size) as _, j}
				<Area isFlagged={false} visible coordinate={board.coordinateAt(i, j)} size={vh} />
			{/each}
		{/each}
	</div>
</div>
