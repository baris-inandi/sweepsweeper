<script>
	import isMobile from "$lib/utils/isMobile";
	import Game from "./Game.svelte";
	$: innerWidth = 0;
	$: innerHeight = 0;
</script>

<svelte:window bind:innerWidth bind:innerHeight />
{#if innerWidth > 0 && innerHeight > 0}
	<div style={`width:100vw;height:${isMobile(false) ? "85vh" : "100vh"}`}>
		<Game vt={innerHeight > innerWidth ? "vw" : "vh"} />
	</div>
{/if}
