<script lang="ts">
	import Coordinate from "$lib/Coordinate/Coordinate";
	import MinesweeperBoard from "$lib/MinesweeperBoard";
	import Area from "../Area/Area.svelte";
	import Flag from "../Area/Flag/Flag.svelte";
	export let size: number;
	export let minePercentage: number;
	export let board = new MinesweeperBoard(size, minePercentage, null);
	let explosion = "";

	let numFlags = board.numMines();

	$: vh = 60 / size;
	$: restarts = 0;
	$: {
		size;
		minePercentage;
		explosion = "";
		board = new MinesweeperBoard(size, minePercentage, null);
		numFlags = MinesweeperBoard.calculateNumMines(size, minePercentage / 100);
	}

	let currentPlayingSounds = 0;
	const sound = (path: string, vol: number = 0.75) => {
		if (currentPlayingSounds > 0) return;
		currentPlayingSounds++;
		const audio = new Audio(path);
		audio.volume = vol;
		audio.play().then(() => {
			currentPlayingSounds--;
		});
	};

	const startExplodingMines = () => {
		const FIRST_MINE_EXPLOSION_TIME = 1000;
		const LAST_MINE_EXPLOSION_TIME =
			board.boardSize > 20 ? 5000 : board.boardSize > 12 ? 4000 : 3000;
		sound("/sounds/soft_pop.mp3");
		explosion = "animation:0.5s shake; animation-timing-function: ease-out; pointer-events: none;";
		board.mines.forEach((mine) => {
			setTimeout(() => {
				mine.reveal();
				sound("/sounds/pop.mp3", 0.25);
				board = board;
			}, Math.floor(Math.random() * (LAST_MINE_EXPLOSION_TIME - FIRST_MINE_EXPLOSION_TIME + 1) + FIRST_MINE_EXPLOSION_TIME));
		});
	};

	const rightClickHandler = (c: Coordinate) => {
		if (numFlags <= 0 && !c.flagged) return;
		let flagged = board.rightClick(c);
		if (flagged) {
			sound("/sounds/flag.mp3");
			numFlags--;
		} else if (c.isHidden) {
			numFlags++;
		}
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

	const startTimer = () => {}
</script>

<div class="select-none w-screen h-screen flex flex-col items-center justify-center">
	<div
		style={`grid-template-columns: repeat(${size}, minmax(0, 1fr)); ${explosion}`}
		class="grid w-fit border border-lime-500 dark:border-neutral-900"
	>
		{#each Array(size) as _, i}
			{#each Array(size) as _, j}
				{#if board.uninitialized}
					<Area
						onLeftClick={(c) => {
							board.initialize(c);
							board = board;
							startTimer();
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
	<div class="my-4 flex justify-between items-center" style={`width:${vh * size}vh;`}>
		<div>
			<div class="flex gap-4 items-center">
				<Flag size={7} />
				<span class="text-md text-neutral-600" style="font-family: 'Press Start 2P';">
					{numFlags}
				</span>
			</div>
		</div>
		<span class="text-md text-neutral-600" style="font-family: 'Press Start 2P';"> 00:00 </span>
		<div>
			<button class="text-center bg-blue-500 px-7 py-2 rounded-md text-white">Settings</button>
			<button
				on:click={() => {
					board = new MinesweeperBoard(size, minePercentage, null);
					explosion = "";
				}}
				class="text-center bg-blue-500 px-7 py-2 rounded-md text-white">Retry</button
			>
		</div>
	</div>
</div>
