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
import { useStore } from "@nanostores/react"
import { reload } from "@/store"
import { newGame } from "@/store"
import { userGames } from "@/store"
import type { Collection } from "@/types/collection"
import { userCollections } from "@/store"

export function SideSearch() {
	const $reload = useStore(reload)
	const $newGame = useStore(newGame)
	const $userGames = useStore(userGames)

	useEffect(() => {
		const fetchGames = async () => {
			const res = await fetch(`/api/users/userGames.json`)
			const initialGames: Game[] = await res.json()
			userGames.set(initialGames)

			const resCollection = await fetch(`/api/collections/collection.json`)
			const collections: Collection[] = await resCollection.json()
			userCollections.set(collections)
		}
		fetchGames()
	}, [$reload])

	return (
		<Command style={{ maxHeight: "650px" }}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList style={{ flex: "1", maxHeight: "650px", overflowY: "auto" }}>
				<CommandEmpty>No results found.</CommandEmpty>
				{$userGames.map((game) => (
					<CommandItem
						key={game.AppID}
						className={game.AppID === $newGame ? "animate-bouncing " : ""}
					>
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
