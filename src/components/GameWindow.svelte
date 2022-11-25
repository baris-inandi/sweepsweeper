<script>
	import Game from "./Game.svelte";
	$: innerWidth = 0;
	$: innerHeight = 0;
	$: {
		// innerHeight > 0 ? alert("changed") : null;
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />
{#if innerWidth > 0 && innerHeight > 0}
	<div style={`height:${innerHeight}px;width:${innerWidth}px;`}>
		<Game vt={innerHeight > innerWidth ? "vw" : "vh"} />
	</div>
{/if}
