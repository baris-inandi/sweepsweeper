<script>
	import BattleLogo from "../../../components/Battle/shared/BattleLogo.svelte";
	import IdAndNameForm from "../../../components/Battle/shared/IDAndNameForm.svelte";
	import RaysBackground from "../../../components/Battle/shared/RaysBackground.svelte";
</script>

<RaysBackground>
	<BattleLogo />
	<div class="font-game text-center text-white text-sm pt-4 pb-6">
		Host new game
	</div>
	<IdAndNameForm forHost />
</RaysBackground>
