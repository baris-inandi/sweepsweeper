<script lang="ts">
	export let callback: () => void;
	export let keycode: string;

	function onKeyDown(e: KeyboardEvent) {
		if (e.code == keycode) callback();
	}
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />
