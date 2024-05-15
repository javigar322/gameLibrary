// Type imports
import type { ManifestOptions } from "vite-plugin-pwa"

/**
 * Defines the default SEO configuration for the website.
 */
export const seoConfig = {
	baseURL: "https://gamelibrary.es/", // Production URL.
	description:
		"Web sobre una librería de juegos personal que puedes añadir y administrarla como quieras.",
	type: "website",
	image: {
		url: "",
		alt: "Game Library",
		width: 705,
		height: 606,
	},
	siteName: "Game Library",
	twitter: {
		card: "summary_large_image",
	},
}

/**
 * Defines the configuration for PWA webmanifest.
 */
export const manifest: Partial<ManifestOptions> = {
	name: "Game Library",
	short_name: "Game Library",
	description:
		"Web sobre una librería de juegos personal que puedes añadir y administrarla como quieras.",
	theme_color: "#d5ff00",
	background_color: "#d5ff00",
	display: "fullscreen",
	icons: [
		{
			src: "/favicon-192x192.png",
			sizes: "192x192",
			type: "image/svg",
		},
		{
			src: "/favicon-512x512.png",
			sizes: "512x512",
			type: "image/svg",
		},
		{
			src: "/favicon-512x512.png",
			sizes: "512x512",
			type: "image/svg",
			purpose: "any maskable",
		},
	],
}
