import { createReview, getReviews, userReviewed } from "@/db/reviews"
import type { APIRoute } from "astro"
import { getSession } from "auth-astro/server"

// obtener todas las reseñas de un videojuego
export const GET: APIRoute = async ({ params }) => {
	const gamesReviews = await getReviews(params.id)
	if (gamesReviews) {
		return new Response(JSON.stringify(gamesReviews), { status: 200 })
	}
	return new Response(
		JSON.stringify({
			variant: "destructive",
			title: "Error al obtener las reseña",
			message: "No se permite obtener reseñas de esta manera",
		}),
		{ status: 400 }
	)
}

// crear una nueva reseña de un videojuego
export const POST: APIRoute = async ({ params, request }) => {
	const data = await request.formData()
	const user = await getSession(request)
	const review = data.get("review")
	const game_id = params.id
	const user_reviewed = await userReviewed(game_id, user?.user)
	if (user_reviewed) {
		return new Response(
			JSON.stringify({
				variant: "destructive",
				title: "Ya has reseñado este juego",
				message: "No puedes reseñar el mismo juego dos veces",
			}),
			{ status: 400 }
		)
	}
	const created_review = await createReview(review, game_id, user?.user)
	if (!created_review) {
		return new Response(
			JSON.stringify({
				variant: "destructive",
				title: "Error al crear la reseña",
				message: "Error al crear la reseña , intentalo de nuevo",
			}),
			{ status: 400 }
		)
	}
	return new Response(
		JSON.stringify({
			variant: "default",
			title: "Reseña agregada correctamente",
			message: "¡Reseña agregada correctamente!",
		}),
		{ status: 200 }
	)
}
