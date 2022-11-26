<script lang="ts">
	export let restartCallback: () => void;

	function onKeyDown(e: KeyboardEvent) {
		if (e.code == "Escape") restartCallback();
	}
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />
