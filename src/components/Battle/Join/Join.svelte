<script lang="ts">
	import RaysBackground from "../shared/RaysBackground.svelte";
	import BattleLogo from "../shared/BattleLogo.svelte";
	import IdAndNameForm from "../shared/IDAndNameForm.svelte";
	import { page } from "$app/stores";
	let presetID = (() => {
		let id = $page.url.searchParams.get("id");
		if (typeof id == "string") return id;
		return "";
	})();
</script>

<RaysBackground>
	<div class="font-game w-fit pb-12 px-20 text-center">
		<BattleLogo />
	</div>
	<IdAndNameForm forJoin {presetID} />
</RaysBackground>
