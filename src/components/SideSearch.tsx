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

import { games } from "@/lib/data"
import "@/styles/globals.css"

export function SideSearch() {
	return (
		<Command style={{ maxHeight: "650px" }}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList style={{ flex: "1", maxHeight: "650px", overflowY: "auto" }}>
				<CommandEmpty>No results found.</CommandEmpty>
				{games.map((game) => (
					<CommandItem key={game.id}>
						<a href={`/game/${game.id}`} className="flex w-full items-center gap-2 ">
							<picture className="h-8 w-8 flex-none">
								<img
									src={game.url}
									alt="videojuego de prueba"
									className="h-full w-full object-cover"
									width="32"
									height="32"
									loading="eager"
								/>
							</picture>
							<span className="truncate text-sm font-semibold text-foreground">{game.name}</span>
						</a>
					</CommandItem>
				))}
			</CommandList>
		</Command>
	)
}
