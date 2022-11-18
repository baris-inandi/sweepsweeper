<script lang="ts">
	export let size: number;
	export let contents: string;
</script>

<div
	style={`height:${size}vh;width:${size}vh`}
	class="text-xs flex items-center justify-center bg-green-200 outline outline-green-600 text-center text-green-600"
>
	{contents}
</div>
