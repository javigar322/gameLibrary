import { type APIRoute } from "astro"
import { getUser } from "@/db/users"
import { getSession } from "auth-astro/server"

// obtener  usuario por id
export const GET: APIRoute = async ({ request }) => {
	const session = await getSession(request)
	const user = await getUser(session?.user?.id)
	if (!user) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		})
	}
	return new Response(JSON.stringify(user), {
		status: 200,
	})
}
