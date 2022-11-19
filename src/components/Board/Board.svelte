<script lang="ts">
	import Coordinate from "$lib/Coordinate/Coordinate";
	import MinesweeperBoard from "$lib/MinesweeperBoard";
	import Area from "../Area/Area.svelte";
	export let size: number;
	export let minePercentage: number;
	export let board = new MinesweeperBoard(size, minePercentage, null);
	let explosion = "";
	$: vh = 60 / size;

	$: {
		size;
		minePercentage;
		board = new MinesweeperBoard(size, minePercentage, null);
	}

	let currentPlayingSounds = 0;
	const sound = (path: string) => {
		if (currentPlayingSounds > 0) return;
		currentPlayingSounds++;
		const audio = new Audio(path);
		audio.volume = 0.5;
		audio.play().then(() => {
			currentPlayingSounds--;
		});
	};

	const startExplodingMines = () => {
		const FIRST_MINE_EXPLOSION_TIME = 1000;
		const LAST_MINE_EXPLOSION_TIME =
			board.boardSize > 20 ? 5000 : board.boardSize > 12 ? 4000 : 3000;
		sound("/sounds/pop.mp3");
		explosion = "animation:0.5s shake; animation-timing-function: ease-out; pointer-events: none;";
		board.mines.forEach((mine) => {
			setTimeout(() => {
				mine.reveal();
				sound("/sounds/pop.mp3");
				board = board;
			}, Math.floor(Math.random() * (LAST_MINE_EXPLOSION_TIME - FIRST_MINE_EXPLOSION_TIME + 1) + FIRST_MINE_EXPLOSION_TIME));
		});
	};

	const rightClickHandler = (c: Coordinate) => {
		let flagged = board.rightClick(c);
		if (flagged) sound("/sounds/flag.mp3");
		board = board;
	};

	const leftClickHandler = (c: Coordinate) => {
		if (c.flagged) {
			rightClickHandler(c);
			return;
		}
		let gameContinues = board.leftClick(c);
		board = board;
		if (!gameContinues) startExplodingMines();
	};
</script>

<div class="select-none w-screen h-screen flex items-center justify-center">
	<div
		style={`grid-template-columns: repeat(${size}, minmax(0, 1fr)); ${explosion}`}
		class="grid w-fit border border-neutral-300 dark:border-neutral-900"
	>
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
						onRightClick={rightClickHandler}
						coordinate={board.coordinateAt(i, j)}
						size={vh}
					/>
				{/if}
			{/each}
		{/each}
	</div>
</div>
