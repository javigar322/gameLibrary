import { checkGameInLibrary, removeGameFromLibrary } from "@/db/users"
import { type APIRoute } from "astro"
import { getSession } from "auth-astro/server"

// detectar si el juego ya lo tiene el usuario
export const GET: APIRoute = async ({ params, request }) => {
	const session = await getSession(request)
	const userId = session?.user?.id
	if (!userId) {
		return new Response(
			JSON.stringify({
				message: "Unauthorized",
			}),
			{ status: 401 }
		)
	}
	const userGames = await checkGameInLibrary(params.id, userId)
	if (!userGames) {
		return new Response(JSON.stringify(userGames), { status: 404 })
	}
	return new Response(JSON.stringify(userGames), { status: 200 })
}

export const DELETE: APIRoute = async ({ params, request }) => {
	const session = await getSession(request)
	const userId = session?.user?.id
	if (!userId) {
		return new Response(null, {
			status: 401,
			statusText: "Unauthorized",
		})
	}
	const update_user = await removeGameFromLibrary(params.id, userId)
	if (!update_user) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		})
	}
	return new Response(null, {
		status: 200,
	})
}
