<script lang="ts">
	import Board from "$lib/MinesweeperBoard/Board";
	import Area from "../Area/Area.svelte";
	export let size: number;
	export const vh = (size > 9 ? 60 : 50) / size;
	export let board = new Board(size, null);
</script>

<div class="select-none w-screen h-screen dark:bg-neutral-900 flex items-center justify-center">
	<div style={`grid-template-columns: repeat(${size}, minmax(0, 1fr));`} class="grid w-fit">
		{#each Array(size) as _, i}
			{#each Array(size) as _, j}
				<Area
					isFlagged={false}
					onLeftClick={(c) => {
						board = new Board(size, null); // TODO: remove this
						board.leftClick(c);
						board = board;
						console.log(board.toString());
					}}
					onRightClick={(c) => {
						console.log(c);
					}}
					coordinate={board.coordinateAt(i, j)}
					size={vh}
				/>
			{/each}
		{/each}
	</div>
</div>
