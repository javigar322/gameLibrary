import React, { useEffect, useState } from "react"
import type { Game } from "@/types/game"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

export function SearchResult() {
	const [games, setGames] = useState<Game[]>([])
	const [offset, setOffset] = useState(0)

	const loadMore = async () => {
		const res = await fetch(`/api/games/games.json?offset=${offset}`)
		const newGames = await res.json()
		setGames((prevGames) => [...prevGames, ...newGames])
		setOffset((prevOffset) => prevOffset + 8)
	}

	useEffect(() => {
		const fetchGames = async () => {
			const res = await fetch(`/api/games/games.json?offset=${offset}`)
			const initialGames = await res.json()
			setGames(initialGames)
			setOffset((prevOffset) => prevOffset + 8)
		}
		fetchGames()
	}, [])

	return (
		<ScrollArea className="h-full w-full">
			<h1 className="mt-4 px-4 text-2xl font-bold">Resultados de la busqueda</h1>
			<section className="mt-2  grid grid-cols-4 gap-4 px-4">
				{games.map((game) => (
					<a
						href={`/store/${game.AppID}`}
						title={"ir a la pagina de la tienda de " + game.Name}
						key={game.AppID}
					>
						<Card className="">
							<img
								src={game["Header image"]}
								alt={`Imagen del juego ${game.Name}`}
								className="h-full w-full rounded-t-md object-cover"
								width="889"
								height="500"
								loading="eager"
							/>
							<div className="mt-2 flex justify-between px-2">
								<h4 className="truncate">{game.Name}</h4>
								<p className={`${getScoreColor(game["Metacritic score"])} `}>
									{game["Metacritic score"]}
								</p>
							</div>
							<p className="mb-2 mt-2 line-clamp-3 px-2">{game["About the game"]}</p>
						</Card>
					</a>
				))}
			</section>
			<div className="mt-4 flex justify-center">
				<Button onClick={loadMore}>Mostrar más</Button>
			</div>
		</ScrollArea>
	)
}

function getScoreColor(score: number) {
	if (score >= 75) {
		return "text-green-500" // Verde para puntuaciones altas
	} else if (score >= 50) {
		return "text-yellow-500" // Amarillo para puntuaciones medias
	} else {
		return "text-red-500" // Rojo para puntuaciones bajas
	}
}
