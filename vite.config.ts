import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.resolve();

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	base: "/", // default for Netlify root deployments
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
