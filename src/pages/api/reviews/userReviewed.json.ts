import { userReviewed } from "@/db/reviews"
import { type APIRoute } from "astro"
import { getSession } from "auth-astro/server"

export const GET: APIRoute = async ({ request }) => {
	const session = await getSession(request)
	const user = session?.user
	if (!user) {
		return new Response(
			JSON.stringify({
				variant: "destructive",
				title: "No has iniciado sesión",
				message: "Inicia sesión para ver las reseñas que has hecho",
			}),
			{ status: 400 }
		)
	}
	const { url } = request
	const searchParams = new URL(url).searchParams
	const game_id = Number(searchParams.get("id") ?? null)
	if (!game_id) {
		return new Response(
			JSON.stringify({
				variant: "destructive",
				title: "No se encontró el juego",
				message: "No se encontró el juego con el id proporcionado",
			}),
			{ status: 404 }
		)
	}
	const user_reviewed = await userReviewed(user)
	return new Response(JSON.stringify(user_reviewed), { status: 200 })
}
