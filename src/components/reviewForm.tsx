import { type FormEvent, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ReviewForm() {
	const [responseMessage, setResponseMessage] = useState("")

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const response = await fetch("/api/reviews/review.json", {
			method: "POST",
			body: formData,
		})
		const data = await response.json()
		if (data.message) {
			setResponseMessage(data.message)
		}
	}
	return (
		<form onSubmit={submit} className="space-y-5">
			<label htmlFor="review">
				<Textarea
					required
					id="review"
					name="review"
					placeholder="escribe la reseña del videojuego"
				/>
			</label>
			{responseMessage && <p>{responseMessage}</p>}
			<Button type="submit">Enviar reseña</Button>
		</form>
	)
}
