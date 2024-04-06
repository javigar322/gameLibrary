import type { Game } from "@/types/game"
import { useEffect, useState } from "react"

export function GameStore(props: any) {
	const [game, setGame] = useState<Game>()

	useEffect(() => {
		const fetchGame = async (): Promise<Game> => {
			const response = await fetch(`/api/gameId.json?${props.id}`)
			const data = await response.json()
			console.log(data)
			return data
		}
		fetchGame()
	}, [])

	return (
		<div>
			<h1>{game?.Name}</h1>
		</div>
	)
}
