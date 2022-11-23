<script lang="ts">
	import Coordinate from "$lib/Coordinate/Coordinate";
	import MinesweeperBoard from "$lib/MinesweeperBoard";
	import Area from "../Area/Area.svelte";
	import Panel from "./Panel/Panel.svelte";
	import Settings from "../Settings/Settings.svelte";
	import MobileMenu from "./MobileMenu/MobileMenu.svelte";
	import isMobile from "$lib/utils/isMobile";

	const DUMP_BOARD_TO_CONSOLE = true;

	export let defaultBoardSize: number;
	export let defaultMinePercentage: number;
	export let size: number;
	export let vt: string;
	export let minePercentage: number;
	export let board = new MinesweeperBoard(size, minePercentage, null);

	let settingsVisible = false;
	let isUnmuted = true;

	let boardStyleStateForGameEndings = "";
	if (DUMP_BOARD_TO_CONSOLE) console.log(board.toString());

	$: finalMessage = "";
	let windowInnerWidth = 0;
	$: vv = (vt === "vw" ? (windowInnerWidth < 500 ? 85 : 70) : 60) / size;
	$: {
		size;
		minePercentage;
		resetTimer();
		resetInternalState();
		board = new MinesweeperBoard(size, minePercentage, null);
	}

	const resetInternalState = () => {
		selectedCoordinate = new Coordinate(-1, -1, -2);
		mobileControlPermitted = true;
		boardStyleStateForGameEndings = "";
		finalMessage = "";
	};

	let timer = 0;

	let currentPlayingSounds = 0;
	const sound = async (path: string, vol: number = 0.75) => {
		if (currentPlayingSounds > 0) return;
		currentPlayingSounds++;
		forceSound(path, vol);
		currentPlayingSounds--;
	};

	const forceSound = async (path: string, vol: number = 0.75) => {
		if (!isUnmuted) vol = 0;
		const audio = new Audio(path);
		audio.volume = vol;
		await audio.play();
	};

	const resetTimer = () => {
		timer = 0;
		clearInterval(timerInterval);
	};

	const stopTimer = () => {
		clearInterval(timerInterval);
	};

	let popSoundsTimeoutBuffer = new Array<NodeJS.Timeout>();
	const lose = (startCoordinate: Coordinate) => {
		stopTimer();
		mobileControlPermitted = false;
		finalMessage = "You lost!";
		const MINE_EXPLOSION_STEP = 100;
		const FIRST_MINE_EXPLOSION_TIME = 1000;
		const LAST_MINE_EXPLOSION_TIME =
			board.boardSize > 20 ? 5000 : board.boardSize > 12 ? 4000 : 3000;
		forceSound("/sounds/explode.mp3");
		boardStyleStateForGameEndings =
			"animation:0.5s shake; animation-timing-function: ease-out; pointer-events: none;";
		board.mines.forEach((mine) => {
			const soundInterval = setTimeout(() => {
				if (mine.flagged || mine.ID() == startCoordinate.ID()) return;
				mine.reveal();
				sound("/sounds/pop.mp3", 0.25);
				board = board;
			}, MINE_EXPLOSION_STEP * Math.floor(Math.random() * (LAST_MINE_EXPLOSION_TIME / MINE_EXPLOSION_STEP - FIRST_MINE_EXPLOSION_TIME / MINE_EXPLOSION_STEP + 1) + FIRST_MINE_EXPLOSION_TIME / MINE_EXPLOSION_STEP));
			popSoundsTimeoutBuffer.push(soundInterval);
		});
	};

	const win = () => {
		stopTimer();
		mobileControlPermitted = false;
		finalMessage = "You win!";
		forceSound("/sounds/win.mp3");
		boardStyleStateForGameEndings =
			"animation: 1.6s bounce; animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1); pointer-events: none;";
	};

	const rightClickHandler = (c: Coordinate) => {
		let flagged = board.rightClick(c);
		if (flagged === 0) return;
		if (flagged) sound("/sounds/flag.mp3");
		if (flagged === -1) win();
		board = board;
	};

	const leftClickHandler = (c: Coordinate) => {
		if (DUMP_BOARD_TO_CONSOLE) console.log(board.toString());
		if (!c.isHidden) return;
		let gameContinues = board.leftClick(c);
		board = board;
		if (!gameContinues) lose(c);
	};

	let timerInterval: NodeJS.Timeout;
	const startTimer = () => {
		timerInterval = setInterval(() => {
			timer = Math.floor(Date.now() - board.epoch) / 1000;
		}, 1000);
	};

	const initialClick = (c: Coordinate) => {
		board.initialize(c);
		forceSound("/sounds/start.mp3", 0.5);
		board = board;
		if (DUMP_BOARD_TO_CONSOLE) console.log(board.toString());
		startTimer();
	};

	const restartCallback = () => {
		board = new MinesweeperBoard(size, minePercentage, null);
		resetInternalState();
		resetTimer();
		popSoundsTimeoutBuffer.forEach((i) => {
			clearInterval(i);
		});
	};

	let selectedCoordinate = new Coordinate(-1, -1, -2);
	let mobileControlPermitted = true;
</script>

<svelte:window bind:innerWidth={windowInnerWidth} />
<div class="w-screen h-screen flex flex-col items-center justify-center">
	<Panel
		{vt}
		bind:vv
		bind:size
		bind:timer
		bind:settingsVisible
		bind:board
		{restartCallback} />
	<Settings
		bind:visible={settingsVisible}
		bind:boardSize={size}
		bind:minePercentage
		bind:isUnmuted
		{defaultBoardSize}
		{defaultMinePercentage} />
	<div
		style={`grid-template-columns: repeat(${size}, minmax(0, 1fr)); ${boardStyleStateForGameEndings}`}
		class="grid w-fit border-lime-500">
		{#each Array(size) as _, i}
			{#each Array(size) as _, j}
				{#if board.uninitialized}
					<Area
						{vt}
						bind:selectedCoordinate
						bypassMobile
						onLeftClick={initialClick}
						onRightClick={initialClick}
						coordinate={new Coordinate(i, j, -2)}
						{vv} />
				{:else}
					<Area
						{vt}
						bind:selectedCoordinate
						onLeftClick={leftClickHandler}
						onRightClick={rightClickHandler}
						coordinate={board.coordinateAt(i, j)}
						{vv} />
				{/if}
			{/each}
		{/each}
	</div>
	<div class="flex flex-col gap-4" style={`width:${size * vv}${vt}`}>
		{#if isMobile() && mobileControlPermitted}
			<MobileMenu
				coordinate={selectedCoordinate}
				onReveal={(c) => {
					if (c.value == -2) {
						return initialClick(c);
					}
					leftClickHandler(c);
				}}
				onFlag={(c) => {
					rightClickHandler(c);
				}} />
		{/if}
		<div
			class="h-0 pt-3 uppercase text-neutral-500 game-font text-center w-full"
			style={`font-size: 1.8${vt};`}>
			{finalMessage}
		</div>
	</div>
</div>
