<script lang="ts">
	import Coordinate from "$lib/Coordinate/Coordinate";
	import MinesweeperBoard from "$lib/MinesweeperBoard";
	import Area from "../Area/Area.svelte";
	export let size: number;
	export let minePercentage: number;
	$: vh = 60 / size;
	export let board = new MinesweeperBoard(size, minePercentage, null);

	const leftClickHandler = (c: Coordinate) => {
		board.leftClick(c);
		board = board;
		console.log(board.toString());
	};
</script>

<div class="select-none w-screen h-screen flex items-center justify-center">
	<div style={`grid-template-columns: repeat(${size}, minmax(0, 1fr));`} class="grid w-fit">
		{#each Array(size) as _, i}
			{#each Array(size) as _, j}
				{#if board.uninitialized}
					<Area
						onLeftClick={(c) => {
							board.initialize(c);
							board = board;
						}}
						onRightClick={(c) => {}}
						coordinate={new Coordinate(i, j, -2)}
						size={vh}
					/>
				{:else}
					<Area
						onLeftClick={leftClickHandler}
						onRightClick={(c) => {
							board.rightClick(c);
							board = board;
						}}
						coordinate={board.coordinateAt(i, j)}
						size={vh}
					/>
				{/if}
			{/each}
		{/each}
	</div>
</div>
