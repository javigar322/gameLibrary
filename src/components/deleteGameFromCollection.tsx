import { Trash2 } from "lucide-react"

export function DeleteGameFromCollection() {
	const handleDelete = () => {
		console.log("delete game")
	}

	return <Trash2 className="  hover:text-primary" onClick={handleDelete} />
}
