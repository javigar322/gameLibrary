import React, { useState, useEffect } from "react"
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command"

import "@/styles/globals.css"
import type { Game } from "@/types/game"

export function SideSearch() {
	const [games, setGames] = useState<Game[]>([])

	useEffect(() => {
		const fetchGames = async () => {
			const res = await fetch(`/api/users/userGames.json`)
			const initialGames: Game[] = await res.json()
			setGames(initialGames)
		}
		fetchGames()
	}, [])

	return (
		<Command style={{ maxHeight: "650px" }}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList style={{ flex: "1", maxHeight: "650px", overflowY: "auto" }}>
				<CommandEmpty>No results found.</CommandEmpty>
				{games.map((game) => (
					<CommandItem key={game.AppID}>
						<a href={`/store/${game.AppID}`} className="flex w-full items-center gap-2 ">
							<picture className="h-8 w-8 flex-none">
								<img
									src={game["Header image"]}
									alt="videojuego de prueba"
									className="h-full w-full object-cover"
									width="32"
									height="32"
									loading="eager"
								/>
							</picture>
							<span className="truncate text-sm font-semibold text-foreground">{game.Name}</span>
						</a>
					</CommandItem>
				))}
			</CommandList>
		</Command>
	)
}
