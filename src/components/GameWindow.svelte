<script>
	import Game from "./Game.svelte";
	$: innerWidth = 0;
	$: innerHeight = 0;
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<Game vt={innerHeight > innerWidth ? "vw" : "vh"} />
