import type { Game } from "@/types/game"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export const columns: ColumnDef<Game>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value: any) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "Name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: "Release date",
		header: "Release date",
	},
	{
		accessorKey: "Estimated owners",
		header: "Estimated owners",
	},
	{
		accessorKey: "Metacritic score",
		header: "Metacritic score",
	},
	{
		accessorKey: "User score",
		header: "User score",
	},
	{
		accessorKey: "Mac",
		header: "Mac",
	},
	{
		accessorKey: "Linux",
		header: "Linux",
	},
	{
		accessorKey: "Windows",
		header: "Windows",
	},
	{
		accessorKey: "Achievements",
		header: "Achievements",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const game: Game = row.original

			const GameFormSchema = z.object({
				"Name": z
					.string()
					.min(1, {
						message: "El nombre del juego es requerido.",
					})
					.optional(),
				"Release date": z
					.string()
					.refine((value) => !isNaN(Date.parse(value)), {
						message: "La fecha de lanzamiento debe ser una fecha válida.",
					})
					.optional(),
				"Genres": z
					.string()
					.min(1, {
						message: "El género del juego es requerido.",
					})
					.optional(),
				"Tags": z
					.string()
					.min(1, {
						message: "Las etiquetas del juego son requeridas.",
					})
					.optional(),
				"Screenshots": z
					.string()
					.min(1, {
						message: "Las capturas de pantalla del juego son requeridas.",
					})
					.optional(),
				"Movies": z
					.string()
					.min(1, {
						message: "Los videos del juego son requeridos.",
					})
					.optional(),
				"Developers": z
					.string()
					.min(1, {
						message: "Los desarrolladores del juego son requeridos.",
					})
					.optional(),
				"Publishers": z
					.string()
					.min(1, {
						message: "Los editores del juego son requeridos.",
					})
					.optional(),
				"Price": z
					.number()
					.min(0, {
						message: "El precio del juego es requerido.",
					})
					.optional(),
			})

			const { toast } = useToast()

			const form = useForm<z.infer<typeof GameFormSchema>>({
				resolver: zodResolver(GameFormSchema),
				defaultValues: {
					"Name": game.Name,
					"Release date": game["Release date"],
					"Genres": game.Genres,
					"Tags": game.Tags,
					"Screenshots": game.Screenshots,
					"Movies": game.Movies,
					"Developers": game.Developers,
					"Publishers": game.Publishers,
					"Price": game.Price,
				},
			})

			const handleDelete = async () => {
				const response = await fetch(`/api/games/admin/${game.AppID}`, {
					method: "DELETE",
				})
				if (response.ok) {
					window.location.reload()
					toast({
						title: "Juego eliminado",
						description: "Tu juego ha sido eliminado correctamente",
						action: (
							<ToastAction altText="Borrar notificación" key="Delete">
								Undo
							</ToastAction>
						),
					})
				} else {
					toast({
						variant: "destructive",
						title: "Juego no eliminado",
						description: "Tu juego no ha sido eliminado correctamente",
						action: (
							<ToastAction altText="Borrar notificación" key="Delete">
								Undo
							</ToastAction>
						),
					})
				}
			}

			async function editGame(values: z.infer<typeof GameFormSchema>) {
				const response = await fetch(`/api/games/admin/${game.AppID}`, {
					method: "PATCH",
					body: JSON.stringify(values),
				})
				if (response.ok) {
					window.location.reload()
					toast({
						title: "Juego editado",
						description: "Tu juego ha sido editado correctamente",
						action: (
							<ToastAction altText="Borrar notificación" key="Delete">
								Undo
							</ToastAction>
						),
					})
				} else {
					toast({
						variant: "destructive",
						title: "Juego no editado",
						description: "Tu juego no ha sido editado correctamente",
						action: (
							<ToastAction altText="Borrar notificación" key="Delete">
								Undo
							</ToastAction>
						),
					})
				}
			}

			return (
				<Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Abrir Menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Acciones</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(game.AppID.toString())}
							>
								Copiar Id
							</DropdownMenuItem>
							<DropdownMenuSeparator />

							<DialogTrigger asChild>
								<DropdownMenuItem>Editar juego</DropdownMenuItem>
							</DialogTrigger>

							<DropdownMenuItem onClick={() => handleDelete()} className="text-red-500">
								Borrar juego
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DialogContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(editGame)} className="space-y-8">
								<FormField
									control={form.control}
									name="Name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nombre</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>Nombre del juego</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="Release date"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Fecha de lanzamiento</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>Fecha de lanzamiento del juego</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="Genres"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Géneros</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>Géneros del juego</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="Tags"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Etiquetas</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>Etiquetas del juego</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="Developers"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Desarrolladores</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>Desarrolladores del juego</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="Price"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Precio</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormDescription>Precio del juego</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit">Editar</Button>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			)
		},
	},
]
