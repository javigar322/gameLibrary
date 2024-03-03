import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import vercel from "@astrojs/vercel/serverless"
import auth from "auth-astro"

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		react(),
		auth(),
	],
	output: "server",
	image: {
		domains: ["astro.build"],
		remotePatterns: [
			{
				protocol: "https",
			},
		],
	},
	adapter: vercel(),
})
