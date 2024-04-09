import type { APIRoute } from "astro"
import { getSession } from "auth-astro/server"

export const POST: APIRoute = async ({ request }) => {
	const data = await request.formData()
	const user = await getSession(request)
	const review = data.get("review")
	if (!review) {
		return new Response(
			JSON.stringify({
				message: "Faltan campos requeridos",
			}),
			{ status: 400 }
		)
	}
	return new Response(
		JSON.stringify({
			message: "¡Éxito!",
		}),
		{ status: 200 }
	)
}
