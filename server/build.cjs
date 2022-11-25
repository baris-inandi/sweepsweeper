const { typecheckPlugin } = require("@jgoz/esbuild-plugin-typecheck");

require("esbuild")
	.build({
		entryPoints: ["src/server.ts"],
		bundle: true,
		platform: "node",
		outfile: "dist/index.js",
		plugins: [typecheckPlugin()]
	})
	.then((result) => {
		console.log("esbuild: Build successful");
	});
