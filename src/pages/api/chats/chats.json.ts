import { type APIRoute } from "astro"
import { getUser } from "@/db/users"
import { getSession } from "auth-astro/server"
import { createChat, getAllUsersByChatId } from "@/db/messages"
import type { User } from "@/types/user"

// obtener los usuarios del chat del usuario
export const GET: APIRoute = async ({ request }) => {
	const session = await getSession(request)
	const userId = session?.user?.id
	const user: User = await getUser(userId)
	if (!user) {
		return new Response(JSON.stringify([]), {
			status: 404,
			statusText: "Not found",
		})
	}
	const users = await getAllUsersByChatId(user.chatId, userId)
	console.log(users)

	return new Response(JSON.stringify(users), {
		status: 200,
	})
}

// crear un nuevo chat
export const POST: APIRoute = async ({ request }) => {
	const data = await request.formData()
	const user = await getSession(request)

	if (!data) {
		return new Response(JSON.stringify({}), {
			status: 400,
			statusText: "Bad request",
		})
	}

	const userId = data.get("userId")
	const message = data.get("message")

	const create_chat = await createChat(message, user?.user, userId)

	return new Response(create_chat, {
		status: 200,
	})
}
