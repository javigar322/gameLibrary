import { type APIRoute } from "astro"
import { getSession } from "auth-astro/server"
import { getLibrary } from "@/db/users"
import { getGamesInfo } from "@/db/games"

// obtener todos los juegos de un usuario
export const GET: APIRoute = async ({ request }) => {
	const session = await getSession(request)
	const userId = session?.user?.id
	if (!userId) {
		return new Response(null, {
			status: 401,
			statusText: "Unauthorized",
		})
	}
	const userGames = await getLibrary(userId)
	if (!userGames) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		})
	}
	const gameInfo = await getGamesInfo(userGames)
	return new Response(JSON.stringify(gameInfo), {
		status: 200,
	})
}
