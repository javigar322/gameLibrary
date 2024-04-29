import { type APIRoute } from "astro"
import { getAllUsers } from "@/db/users"

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
