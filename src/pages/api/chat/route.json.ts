import { object, safeParse, string } from "valibot"
import { streamText } from "ai"
import { google } from "@ai-sdk/google"
import type { APIRoute } from "astro"

const RequestSchema = object({
	prompt: string(),
})

export const POST: APIRoute = async ({ request }) => {
	const { success, output, issues } = safeParse(RequestSchema, await request.json())

	if (!success) {
		return new Response(JSON.stringify({ issues }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		})
	}

	const { prompt } = output

	const model = google("models/gemini-pro")

	const result = await streamText({
		model,
		prompt,
		system: "",
		maxTokens: 4096,
		temperature: 0.7,
	})

	return result.toAIStreamResponse()
}
