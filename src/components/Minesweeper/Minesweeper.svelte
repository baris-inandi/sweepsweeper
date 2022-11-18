<script lang="ts">
	import Coordinate from "$lib/MinesweeperBoard/Coordinate/Coordinate";
	import Board from "./Board/Board.svelte";
	import BoardUninit from "./Board/BoardUninit.svelte";
	console.log("\n\n"+Coordinate.neighborsOf(2, 1));
</script>

<Board size={13} />
