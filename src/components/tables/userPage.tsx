import React, { useState, useEffect } from "react"
import { columns } from "./userColumns"
import { DataTable } from "./data-table"
import type { User } from "@/types/user"

export function UserPage() {
	const [data, setData] = useState<User[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const users = await fetch("/api/users/users.json")
				const gameData = await users.json()
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
