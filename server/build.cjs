require("esbuild")
	.build({
		entryPoints: ["src/server.ts"],
		bundle: true,
		platform: "node",
		outfile: "dist/index.js"
	})
	.then((result) => {
		console.log("esbuild: Build successful");
	});
