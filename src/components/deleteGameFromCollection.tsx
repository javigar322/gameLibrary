import { Trash2 } from "lucide-react"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DeleteGameFromCollection(props: any) {
	let collectionGame = props.name
	let game = props.id

	const handleDelete = async () => {
		const response = await fetch(`/api/collections/${game}.json?collection=${collectionGame}`, {
			method: "DELETE",
		})
		window.location.reload()
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Trash2 className="cursor-pointer text-primary transition hover:scale-125 hover:opacity-70" />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Quieres eliminar este juego de la lista?</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Continuar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
