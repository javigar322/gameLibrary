import Twitch from "@auth/core/providers/twitch"
import Github from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"
import Credentials from "@auth/core/providers/credentials "

import { defineConfig } from "auth-astro"

export default defineConfig({
	providers: [
		Twitch({
			clientId: import.meta.env.TWITCH_CLIENT_ID,
			clientSecret: import.meta.env.TWITCH_CLIENT_SECRET,
		}),
		Github({
			clientId: import.meta.env.GITHUB_CLIENT_ID,
			clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
		}),
		Google({
			clientId: import.meta.env.GOOGLE_CLIENT_ID,
			clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
		}),
		Credentials({
			credentials: {
				username: {},
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null

				// logic to salt and hash password
			},
		}),
	],
	callbacks: {
		session: ({ session, token }) => ({
			...session,
			user: {
				...session.user,
				id: token.sub,
			},
		}),
	},
})
