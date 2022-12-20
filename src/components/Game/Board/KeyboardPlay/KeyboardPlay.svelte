<script lang="ts">
	import KeyCapturer from "../KeyCapturer/KeyCapturer.svelte";
	let mouseCoordinates = { x: 0, y: 0 };
	document.onmousemove = function (e) {
		const getMousePos = (e: MouseEvent) => {
			return { x: e.clientX, y: e.clientY };
		};
		mouseCoordinates = getMousePos(e);
	};
	const keyboardLeftClickCallback = () => {
		const x = document.elementFromPoint(
			mouseCoordinates.x,
			mouseCoordinates.y,
		) as HTMLElement | null;
		x?.click();
	};
	const keyboardRightClickCallback = () => {
		const x = document.elementFromPoint(
			mouseCoordinates.x,
			mouseCoordinates.y,
		) as HTMLElement | null;
		if (window.CustomEvent) {
			x?.dispatchEvent(new CustomEvent("contextmenu"));
		} else if (document.createEvent) {
			var ev = document.createEvent("HTMLEvents");
			ev.initEvent("contextmenu", true, false);
			x?.dispatchEvent(ev);
		}
	};
</script>

<KeyCapturer keycode="Digit1" callback={keyboardLeftClickCallback} />
<KeyCapturer keycode="Digit2" callback={keyboardRightClickCallback} />
