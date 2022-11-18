<script lang="ts">
	import MinesweeperBoard from "$lib/MinesweeperBoard/MinesweeperBoard";
	import Area from "./Area/Area.svelte";
	export let size: number;
	export const vh = 45 / size;
	let msb = new MinesweeperBoard(size);
	console.log(msb.toString());
</script>

<div class="w-screen h-screen bg-green-100 flex items-center justify-center">
	<div style={`grid-template-columns: repeat(${size}, minmax(0, 1fr));`} class="grid w-fit">
		{#each Array(size) as _, i}
			{#each Array(size) as _, j}
				<Area contents={i + "," + j} size={vh} />
			{/each}
		{/each}
	</div>
</div>
