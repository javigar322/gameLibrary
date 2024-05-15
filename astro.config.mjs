import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import auth from "auth-astro"
import vercel from "@astrojs/vercel/serverless"
import starlight from "@astrojs/starlight"
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi"
import { VitePWA } from "vite-plugin-pwa"
import sitemap from "@astrojs/sitemap"

// Helper imports
import { manifest, seoConfig } from "./src/utils/seoConfig"

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
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
	build: {
		inlineStylesheets: "always",
	},
	compressHTML: true,
	prefetch: true,
	devToolbar: {
		enabled: false,
	},
	site: seoConfig.baseURL,
	vite: {
		build: {
			cssMinify: false,
		},
		ssr: {
			noExternal: ["path-to-regexp"],
		},
		plugins: [
			VitePWA({
				registerType: "autoUpdate",
				manifest,
			}),
		],
	},
})
