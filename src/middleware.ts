import { defineMiddleware } from "astro:middleware"
import { getSession } from "auth-astro/server"
import { getUser } from "./db/users"

export const onRequest = defineMiddleware(async (context, next) => {
	const session = await getSession(context.request)
	const userFound = await getUser(session?.user?.id)

	if (context.url.pathname.startsWith("/admin")) {
		if (userFound && userFound.role == "admin") {
			return next()
		} else {
			return Response.redirect(new URL("/404", context.url))
		}
	}
	if (context.url.pathname.startsWith("/chat")) {
		if (userFound) {
			return next()
		} else {
			return Response.redirect(new URL("/404", context.url))
		}
	}
	return next()
})
