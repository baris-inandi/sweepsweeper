<script lang="ts">
	export let size: number;
	export let multiplier = 3;
	export let flagColor = "#fc7338";
</script>

<div
	style={`
border-left: ${size / (multiplier * 8)}vh solid ${flagColor};
padding-bottom: ${size / (multiplier * 2)}vh;
`}
>
	<div
		style={`
    width: 0; 
    height: 0; 
    border-top: ${size / (multiplier * 3)}vh solid transparent;
    border-bottom: ${size / (multiplier * 3)}vh solid transparent;
    border-left: ${size / multiplier}vh solid ${flagColor};
    transform: translate(-1px, 1px);
    `}
	/>
</div>
