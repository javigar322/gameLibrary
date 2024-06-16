import { type FormEvent, useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function ReviewForm(props: any) {
	const { toast } = useToast()
	const [responseMessage, setResponseMessage] = useState("")
	if (!props || !props.id) {
		// Manejar el caso en que props o props.id no existen
		return null
	}

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const response = await fetch(`/api/reviews/${props.id}.json`, {
			method: "POST",
			body: formData,
		})
		const data = await response.json()
		if (data.message) {
			setResponseMessage(data.message)
		}
		if (response.ok) {
			toast({
				title: data.title,
				description: data.message,
				action: (
					<ToastAction altText="Borrar notificación" key="Delete">
						Undo
					</ToastAction>
				),
			})
		} else {
			toast({
				variant: "destructive",
				title: data.title,
				description: data.message,
				action: (
					<ToastAction altText="Borrar notificación" key="Delete">
						Undo
					</ToastAction>
				),
			})
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
