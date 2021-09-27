import { defineConfig } from "rollup";
import ts from "rollup-plugin-ts";

export default defineConfig([
	{
		input: "src/default.ts",
		output: [
			{
				file: "dist/default.mjs",
				format: "esm",
			},
		],
		plugins: [ts({ transpiler: "babel" })],
	},
	{
		input: "src/node.ts",
		output: [
			{
				file: "dist/node.mjs",
				format: "esm",
			},
			{
				file: "dist/node.js",
				format: "cjs",
			},
		],
		plugins: [ts({ transpiler: "babel" })],
		external: ["crypto"],
	},
]);
