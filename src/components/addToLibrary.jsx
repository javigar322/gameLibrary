import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useStore } from "@nanostores/react"
import { reload } from "@/store"
import { newGame } from "@/store"
import { CheckSquare } from "lucide-react"
import { XSquare } from "lucide-react"
import { useEffect, useState } from "react"

export function AddToLibrary(props) {
	const { toast } = useToast()
	const $reload = useStore(reload)
	const [included, setIncluded] = useState(false)

	useEffect(() => {
		const checkUserLibrary = async () => {
			const response = await fetch(`/api/users/${props.id}.json`)
			const data = await response.json()
			setIncluded(data)
		}
		checkUserLibrary()
	}, [$reload])

	const handleClickAdd = async () => {
		try {
			console.log("Attempting to add game to library...")
			const response = await fetch(`/api/games/gameId.json?id=${props.id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			})

			const data = await response.json()
			if (response.ok) {
				console.log("Game successfully added to library.")
				toast({
					title: data.title,
					message: data.message,
					action: (
						<ToastAction altText="Borrar notificación" key="Delete">
							Undo
						</ToastAction>
					),
				})
				reload.set(!$reload)
				newGame.set(props.id)
			} else {
				console.log("Error: Game not added to library.")
				toast({
					variant: "destructive",
					title: data.title,
					message: data.message,
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

	const handleClickRemove = async () => {
		try {
			console.log("Attempting to remove game from library...")
			const response = await fetch(`/api/users/${props.id}.json`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			})

			console.log("Response:", response)

			if (response.ok) {
				console.log("Game successfully removed from library.")
				toast({
					title: "Juego eliminado",
					message: "El juego se ha eliminado de tu biblioteca",
					action: (
						<ToastAction altText="Borrar notificación" key="Delete">
							Undo
						</ToastAction>
					),
				})
				reload.set(!$reload)
				newGame.set(props.id)
			} else {
				console.log("Error: Game not removed from library.")
				toast({
					variant: "destructive",
					title: "Error: Juego no eliminado",
					message: "El juego no se ha podido eliminar de tu biblioteca",
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
		<Button
			onClick={included ? handleClickRemove : handleClickAdd}
			variant="default"
			className="ml-5 "
		>
			{included ? <CheckSquare size={24} /> : <XSquare size={24} />}
			añadir juego
		</Button>
	)
}
