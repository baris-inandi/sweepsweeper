<script lang="ts">
	import { customAlphabet } from "nanoid";
	const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const nanoid = customAlphabet(alphabet, 8);
	console.log(nanoid());
</script>
