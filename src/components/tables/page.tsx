import React, { useState, useEffect } from "react"
import { columns } from "./columns"
import type { Game } from "@/types/game"
import { DataTable } from "./data-table"

export function DemoPage() {
	const [data, setData] = useState<Game[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const games = await fetch("/api/games/allGames.json")
				const gameData = await games.json()
				setData(gameData)
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		fetchData()
	}, [])

	return (
		<div className="container mx-auto py-10">
			{data.length > 0 ? <DataTable columns={columns} data={data} /> : <p>Loading...</p>}
		</div>
	)
}
