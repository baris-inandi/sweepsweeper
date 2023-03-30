const path = require("path");

const concurrently = require("concurrently");
concurrently(
	[
		{
			command: "npm run dev",
			name: "S",
			prefixColor: "blue",
			cwd: path.resolve(__dirname, "server"),
		},
		{
			command: process.argv.includes("--host")
				? "npm run vite-host"
				: "npm run vite-dev",
			name: "V",
			prefixColor: "magenta",
			cwd: path.resolve(__dirname),
		},
	],
	{
		killOthers: ["failure"],
		restartTries: 2,
		restartDelay: 500,
		cwd: path.resolve(__dirname, "scripts"),
	},
);
