"use client"

import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function AddToLibrary(props) {
	const { toast } = useToast()

	const handleClickAdd = async () => {
		try {
			console.log("Attempting to add game to library...")

			const response = await fetch(`/api/games/gameId.json?id=${props.id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			})

			console.log("Response:", response)

			if (response.ok) {
				console.log("Game successfully added to library.")
				toast({
					title: "Juego añadido",
					message: "El juego se ha añadido a tu biblioteca",
					action: (
						<ToastAction altText="Borrar notificación" key="Delete">
							Undo
						</ToastAction>
					),
				})
			} else {
				console.log("Error: Game not added to library.")
				toast({
					variant: "destructive",
					title: "Error: Juego no añadido",
					message: "El juego no se ha podido añadir a tu biblioteca",
					action: (
						<ToastAction altText="Borrar notificación" key="Delete">
							Undo
						</ToastAction>
					),
				})
			}
		} catch (error) {
			console.error("Error:", error)
		}
	}

	return (
		<Button onClick={handleClickAdd} variant="default" className="ml-5">
			añadir juego
		</Button>
	)
}
