import { useStore } from "@nanostores/react"
import { userGames } from "@/store"
import { MoreHorizontal, Plus } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserGames() {
	const $userGames = useStore(userGames)

	function addCollection() {
		console.log("Añadir juego a colección")
	}

	function deleteGame() {
		console.log("Borrar juego")
	}

	return (
		<section className=" grid grid-cols-6 gap-4">
			{$userGames.map((game) => (
				<div key={game.AppID}>
					<a href={`/store/${game.AppID}`}>
						<img className="" src={game["Header image"]} alt="videojuego de prueba" />
					</a>
					<div className="flex flex-row items-center justify-between">
						<p>{game.Name}</p>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<MoreHorizontal className="hover:text-primary" />
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuLabel>Colecciones</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuSub>
										<DropdownMenuSubTrigger>
											<Plus className="mr-2 h-4 w-4" />
											<span>Añadir juego</span>
										</DropdownMenuSubTrigger>
										<DropdownMenuPortal>
											<DropdownMenuSubContent>
												<DropdownMenuItem>
													<Plus className="mr-2 h-4 w-4" />
													<span>Email</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Plus className="mr-2 h-4 w-4" />
													<span>Message</span>
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem>
													<Plus className="mr-2 h-4 w-4" />
													<span>More...</span>
												</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuPortal>
									</DropdownMenuSub>
									<DropdownMenuItem onClick={addCollection}>
										<Plus className="mr-2 h-4 w-4" />
										<span>Crear colección</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Plus className="mr-2 h-4 w-4" onClick={deleteGame} />
										<span>Borrar Juego</span>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			))}
		</section>
	)
}
