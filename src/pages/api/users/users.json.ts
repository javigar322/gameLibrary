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
