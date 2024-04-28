import { type APIRoute } from "astro"
import { getGame } from "@/db/games"
import { addGameToLibrary } from "@/db/users"
import { getSession } from "auth-astro/server"

// obtener un juego por id
export const GET: APIRoute = async ({ request }) => {
	const { url } = request
	const searchParams = new URL(url).searchParams
	const id = Number(searchParams.get("id") ?? null)
	const game = await getGame(id)
	if (!game) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		})
	}
	return new Response(JSON.stringify(game), {
		status: 200,
	})
}

// agregar un juego por la id
export const POST: APIRoute = async ({ request }) => {
	const { url } = request
	const searchParams = new URL(url).searchParams
	const id = Number(searchParams.get("id") ?? null)
	const game_found = await getGame(id)
	const session = await getSession(request)
	const userId = session?.user?.id
	if (!game_found || !userId) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		})
	}
	const newGame = await addGameToLibrary(id, userId)
	return new Response(JSON.stringify(newGame), {
		status: 200,
	})
}
