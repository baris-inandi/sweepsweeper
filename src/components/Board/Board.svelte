<script lang="ts">
	import Coordinate from "$lib/Coordinate/Coordinate";
	import MinesweeperBoard from "$lib/MinesweeperBoard";
	import Area from "../Area/Area.svelte";
	import Panel from "./Panel/Panel.svelte";

	export let size: number;
	export let minePercentage: number;
	export let settingsVisible: boolean;
	export let board = new MinesweeperBoard(size, minePercentage, null);
	let boardStyleStateForGameEndings = "";
	let numFlags = board.numMines();

	console.log(board.toString());

	$: finalMessage = "";
	$: vh = 60 / size;
	$: {
		size;
		minePercentage;
		resetTimer();
		boardStyleStateForGameEndings = "";
		finalMessage = "";
		board = new MinesweeperBoard(size, minePercentage, null);
		numFlags = MinesweeperBoard.calculateNumMines(size, minePercentage / 100);
	}

	let timer = 0;

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

	const resetTimer = () => {
		timer = 0;
		clearInterval(timerInterval);
	};
	const stopTimer = () => {
		clearInterval(timerInterval);
	};

	const startExplodingMines = () => {
		stopTimer();
		finalMessage = "You lost!";
		const FIRST_MINE_EXPLOSION_TIME = 1000;
		const LAST_MINE_EXPLOSION_TIME =
			board.boardSize > 20 ? 5000 : board.boardSize > 12 ? 4000 : 3000;
		sound("/sounds/soft_pop.mp3");
		boardStyleStateForGameEndings =
			"animation:0.5s shake; animation-timing-function: ease-out; pointer-events: none;";
		board.mines.forEach((mine) => {
			setTimeout(() => {
				mine.reveal();
				sound("/sounds/pop.mp3", 0.25);
				board = board;
			}, Math.floor(Math.random() * (LAST_MINE_EXPLOSION_TIME - FIRST_MINE_EXPLOSION_TIME + 1) + FIRST_MINE_EXPLOSION_TIME));
		});
	};

	const win = () => {
		stopTimer();
		finalMessage = "You win!";
		sound("/sounds/win.mp3");
		boardStyleStateForGameEndings = "back pointer-events: none;";
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
		if (flagged === 0) {
			win();
		}
	};

	const leftClickHandler = (c: Coordinate) => {
		console.log(board.toString());
		if (c.flagged) {
			rightClickHandler(c);
			return;
		}
		let gameContinues = board.leftClick(c);
		board = board;
		if (!gameContinues) startExplodingMines();
	};

	let timerInterval: NodeJS.Timeout;
	const startTimer = () => {
		timerInterval = setInterval(() => {
			timer++;
		}, 1000);
	};
</script>

<div class="w-screen h-screen flex flex-col items-center justify-center">
	<Panel
		bind:vh
		bind:size
		bind:numFlags
		bind:timer
		bind:settingsVisible
		bind:board
		bind:minePercentage
		bind:boardStyleStateForGameEndings
		bind:finalMessage
		{resetTimer}
	/>
	<div
		style={`grid-template-columns: repeat(${size}, minmax(0, 1fr)); ${boardStyleStateForGameEndings}`}
		class="grid w-fit border border-neutral-100"
	>
		{#each Array(size) as _, i}
			{#each Array(size) as _, j}
				{#if board.uninitialized}
					<Area
						onLeftClick={(c) => {
							board.initialize(c);
							board = board;
							console.log(board.toString());
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
	<div class="h-4" />
	<div class="h-0 uppercase text-neutral-500" style="font-family: 'Press Start 2P';">
		{finalMessage}
	</div>
</div>
