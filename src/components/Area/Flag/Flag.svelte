<script lang="ts">
	export let vv: number;
	export let vt: string;
	export let multiplier = vv < 4 ? 2 : 3;
	export let flagColor = "#ff4747";
</script>

<div
	style={`
border-left: ${vv / (multiplier * 8)}${vt} solid ${flagColor};
padding-bottom: ${vv / (multiplier * 2)}${vt};
`}>
	<div
		style={`
    width: 0; 
    height: 0; 
    border-top: ${vv / (multiplier * 3)}${vt} solid transparent;
    border-bottom: ${vv / (multiplier * 3)}${vt} solid transparent;
    border-left: ${vv / multiplier}${vt} solid ${flagColor};
    transform: translate(-${(vv / 40).toFixed(3)}${vt},${(vv / 40).toFixed(
			3
		)}${vt}); 
    `} />
	<!-- TODO: write the transform in terms of vv and vt -->
</div>
