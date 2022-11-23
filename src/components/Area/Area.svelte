<script lang="ts">
	import type Coordinate from "$lib/Coordinate/Coordinate";
	import isMobile from "$lib/utils/isMobile";
	import Flag from "./Flag/Flag.svelte";
	export let vv: number;
	export let vt: string;
	export let bypassMobile: boolean = false;
	export let coordinate: Coordinate;
	export let selectedCoordinate: Coordinate;
	export let onLeftClick: (c: Coordinate) => void;
	export let onRightClick: (c: Coordinate) => void;

	let isExploded = false;
</script>

<div
	class={`${
		(coordinate.x % 2 == 0) != (coordinate.y % 2 == 0) ? "brightness-95" : ""
	}`}>
	<button
		tabindex="-1"
		on:contextmenu|preventDefault={(e) => {
			onRightClick(coordinate);
		}}
		on:click|preventDefault={(e) => {
			if (!bypassMobile) selectedCoordinate = coordinate;
			if (isMobile() && !bypassMobile) return;
			if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey)
				return onRightClick(coordinate);
			if (coordinate.flagged) return onRightClick(coordinate);
			if (coordinate.isMine()) isExploded = true;
			onLeftClick(coordinate);
		}}
		style={`height:${vv}${vt};width:${vv}${vt}`}
		class={`cursor-default flex items-center justify-center
		${
			selectedCoordinate.ID() == coordinate.ID() &&
			isMobile() &&
			coordinate.isHidden
				? "z-30 border-2 border-lime-700 shadow-lg rounded-sm shadow-lime-300"
				: ""
		}
		${
			isExploded
				? "bg-orange-200"
				: coordinate.isHidden ||
				  (coordinate.flagged && coordinate.isEmpty() && !coordinate.isMine())
				? "bg-lime-300"
				: "bg-orange-100"
		}
		`}>
		{#if coordinate.flagged}
			<Flag {vv} {vt} />
		{:else if !coordinate.isHidden}
			{#if coordinate.value > 0}
				<p
					class={"game-font " +
						[
							"text-sky-600",
							"text-lime-600",
							"text-orange-600",
							"text-fuchsia-600",
							"text-yellow-500",
							"text-pink-500",
							"text-neutral-600",
							"text-black"
						][coordinate.value - 1]}
					style={`filter: contrast(0.4) brightness(1.1); font-size: ${
						vv < 4 ? vv / 2 : vv / 3
					}${vt};`}>
					{coordinate.value}
				</p>
			{:else if coordinate.isMine()}
				<div
					class={`rounded-full ${
						isExploded ? "bg-orange-600" : "bg-neutral-600"
					}`}
					style={`height:${vv / 2.5}${vt};width:${vv / 2.5}${vt}`} />
			{/if}
		{/if}
	</button>
</div>
