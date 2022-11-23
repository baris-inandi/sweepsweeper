<script lang="ts">
	import Coordinate from "$lib/Coordinate/Coordinate";
	import MinesweeperBoard from "$lib/MinesweeperBoard";
	import { io } from "socket.io-client";

	const socket = io(`localhost:3000/`);

	socket.connect();
	socket.on("connect", () => {
		console.log("connected");
	});

	socket.emit(
		"sendMinesweeperBoard",
		new MinesweeperBoard(20, 10, new Coordinate(2, 4, -2))
	);
</script>
