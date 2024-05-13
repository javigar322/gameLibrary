import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import auth from "auth-astro"
import node from "@astrojs/node"
import starlight from "@astrojs/starlight"
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi"

import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		react(),
		auth(),
		starlight({
			defaultLocale: "es",
			plugins: [
				// Generate the OpenAPI documentation pages.
				starlightOpenAPI([
					{
						base: "api/games",
						label: "Games",
						schema: "../gamelibrary/schemas/games.yaml",
					},
					{
						base: "api/reviews",
						label: "Reviews",
						schema: "../gamelibrary/schemas/reviews.yaml",
					},
					{
						base: "api/users",
						label: "Users",
						schema: "../gamelibrary/schemas/users.yaml",
					},
				]),
			],
			sidebar: [
				{
					label: "Documentacion",
					autogenerate: { directory: "documentacion" },
				},
				{
					label: "EndPoints",
					items: [...openAPISidebarGroups],
				},
			],
			title: "Game Library Docs",
		}),
		sitemap(),
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
	adapter: node({
		mode: "middleware",
	}),
})
