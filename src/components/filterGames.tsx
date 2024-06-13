import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Genre } from "@/types/genres"

export function FilterGames() {
	const [name, setName] = useState("")
	const [genre, setGenre] = useState("")
	const [minMetacriticScore, setMinMetacriticScore] = useState(0)
	const [minUserScore, setMinUserScore] = useState(0)

	const params = {
		query: name,
		genre: genre,
		minMetacriticScore: minMetacriticScore.toString(),
		minUserScore: minUserScore.toString(),
	}
	const searchParams = new URLSearchParams(params).toString()

	return (
		<Drawer>
			<DrawerTrigger className="h-fit w-fit text-muted-foreground hover:text-primary">
				Filtros
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="mx-auto">
					<div className=" grid w-full max-w-sm items-center gap-1.5">
						{/* nombre del juego */}
						<Label htmlFor="nombre">Nombre</Label>
						<Input
							type="text"
							id="nombre"
							placeholder="Elden ring"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						{/* genero del juego */}
						<Label htmlFor="genero">Género</Label>
						<Select onValueChange={(e) => setGenre(e.valueOf())}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Géneros" />
							</SelectTrigger>
							<SelectContent>
								{Object.values(Genre).map((genre) => (
									<SelectItem key={genre} value={genre}>
										{genre}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{/* metacritic */}
						<Label htmlFor="metacritic">Metacritic</Label>
						<Input
							type="number"
							id="metacritic"
							placeholder="0"
							value={minMetacriticScore}
							onChange={(e) => setMinMetacriticScore(Number(e.target.value))}
						/>
						{/* user score */}
						<Label htmlFor="userScore">User score</Label>
						<Input
							type="number"
							id="userScore"
							placeholder="0"
							value={minUserScore}
							onChange={(e) => setMinUserScore(Number(e.target.value))}
						/>
					</div>
				</DrawerHeader>
				<DrawerFooter>
					<div className="mx-auto flex flex-row gap-4">
						<DrawerClose>
							<Button>
								<a href={`/games/1?${searchParams}`}>Buscar</a>
							</Button>
						</DrawerClose>
						<DrawerClose>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
