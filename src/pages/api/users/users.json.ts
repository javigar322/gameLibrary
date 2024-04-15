import { type APIRoute } from "astro"
import { createUser, getAllUsers } from "@/db/users"
import { getSession } from "auth-astro/server"

// obtener todos los usuarios
export const GET: APIRoute = async ({}) => {
	const users = await getAllUsers()
	if (!users) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		})
	}
	return new Response(JSON.stringify(users), {
		status: 200,
	})
}

// crear el usuario
export const POST: APIRoute = async ({ request }) => {
	const session = await getSession(request)
	const sessionUser = session?.user?.email
	if (!sessionUser) {
		return new Response(null, {
			status: 401,
			statusText: "Unauthorized",
		})
	}
	const user = await createUser(sessionUser)
	return new Response(JSON.stringify(user), {
		status: 200,
	})
}
