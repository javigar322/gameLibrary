import React, { useState, useEffect, useCallback, useRef } from "react"
import { columns } from "./gameColumns"
import type { Game } from "@/types/game"
import { DataTable } from "./data-table"
import { useStore } from "@nanostores/react"
import { allGames } from "@/store"

export function GamePage() {
	const $allGames = useStore(allGames)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/games/allGames.json")
				const gameData = await response.json()
				allGames.set(gameData)
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		fetchData()
	}, [$allGames]) // Dependencias vacías para ejecutar solo una vez al montar

	return (
		<div className="container mx-auto py-10">
			{$allGames.length > 0 ? <DataTable columns={columns} data={$allGames} /> : <p>Loading...</p>}
		</div>
	)
}
