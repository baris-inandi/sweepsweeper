<script lang="ts">
	import MinesweeperBoard from "$lib/MinesweeperBoard/MinesweeperBoard";
	import Area from "./Area/Area.svelte";
	export let size: number;
	export const vh = 45 / size;
	export const states = ["flagged", "exploded", "number", "empty", "grass"];
	let board = new MinesweeperBoard(size);
	console.log(board.toString());
</script>

<div class="select-none w-screen h-screen dark:bg-neutral-900 flex items-center justify-center">
	<div style={`grid-template-columns: repeat(${size}, minmax(0, 1fr));`} class="grid gap-2 w-fit">
		{#each Array(size) as _, i}
			{#each Array(size) as _, j}
				<Area
					state={states[Math.floor(Math.random() * states.length)]}
					num={Math.round(Math.random() * 3)}
					size={vh}
				/>
			{/each}
		{/each}
	</div>
</div>
