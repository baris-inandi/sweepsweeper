<!-- TODO: add scripted music player here for the battle mode -->
<script lang="ts">
	import fscreen from "fscreen";
	import { onMount } from "svelte";

	const REQUESTS_FULLSCREEN = false;

	onMount(() => {
		if (REQUESTS_FULLSCREEN) {
			fscreen.requestFullscreen(document.body);
		}
	});
</script>

<div id="battle">
	<slot />
</div>
