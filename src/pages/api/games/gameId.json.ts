import { type APIRoute } from "astro"
import { getGame } from "@/db/games"

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
