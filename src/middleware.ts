import { defineMiddleware } from "astro:middleware"
import { getSession } from "auth-astro/server"
import { createUser, getUser } from "./db/users"

export const onRequest = defineMiddleware(async (context, next) => {
	const session = await getSession(context.request)
	const userFound = await getUser(session?.user?.id)

	// comprobar que se ha creado un usuario en la base de datos
	if (session && !userFound) {
		await createUser(session.user)
	}

	// comprobar que el usuario tiene permisos para acceder a la página
	if (context.url.pathname.startsWith("/admin")) {
		if (userFound && userFound.role == "admin") {
			return next()
		} else {
			return Response.redirect(new URL("/404", context.url))
		}
	}

	// comprobar que el usuario tiene permisos para acceder a la página
	if (context.url.pathname.startsWith("/chat")) {
		if (userFound) {
			return next()
		} else {
			return Response.redirect(new URL("/404", context.url))
		}
	}

	// si no se cumple ninguna de las condiciones anteriores, permitir el acceso
	return next()
})
