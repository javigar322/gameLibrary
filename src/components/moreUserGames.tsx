import { useStore } from "@nanostores/react"
import { reload, userGames } from "@/store"
import { MoreHorizontal, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { userCollections } from "@/store"
import { useEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { dragAndDrop } from "@formkit/drag-and-drop/react"
import type { Game } from "@/types/game"
import { type NodeDragEventData } from "@formkit/drag-and-drop"
import { draggedGame } from "@/store"

export function MoreUserGames(props: any) {
	const $userCollections = useStore(userCollections)
	const $reload = useStore(reload)
	const $userGames = useStore(userGames)

	const [games, setGames] = useState<Game[]>([])
	const parentRef = useRef(null)

	useEffect(() => {
		setGames($userGames)
	}, [$userGames])

	dragAndDrop({
		parent: parentRef,
		state: [games, setGames],
		handleDragstart: (data: NodeDragEventData<Game>) => {
			draggedGame.set(data.targetData.node.data.value)
		},
	})

	const [isDialogOpen, setDialogOpen] = useState(false)
	const { toast } = useToast()

	const openDialog = () => setDialogOpen(true)
	const closeDialog = () => setDialogOpen(false)

	const AddCollection = () => {
		const formSchema = z.object({
			collectionName: z.string().min(3, {
				message: "Las colecciones deben tener al menos 3 caracteres.",
			}),
		})

		const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: {
				collectionName: "",
			},
		})

		async function onSubmit(values: z.infer<typeof formSchema>) {
			const collection = await fetch(
				`/api/collections/collection.json?collection=${values.collectionName}`,
				{
					method: "POST",
				}
			)
			const data = await collection.json()
			if (data) {
				reload.set(true)
				toast({
					variant: data.variant,
					title: data.title,
					description: data.message,
					action: (
						<ToastAction altText="Borrar notificación" key="Delete">
							Undo
						</ToastAction>
					),
				})
			}
			closeDialog()
			console.log(values)
		}

		return (
			<Dialog open={isDialogOpen} onOpenChange={closeDialog}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Crear colección del juego con id </DialogTitle>
						<DialogDescription>Añade un nombre a la colección.</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="collectionName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre</FormLabel>
										<FormControl>
											<Input placeholder="jueguitos" {...field} />
										</FormControl>
										<FormDescription>Este es el nombre de la colección.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Agregar</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<>
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
									{$userCollections.length > 0 ? (
										$userCollections.map((collection, index) => (
											<DropdownMenuItem key={index}>
												<Plus className="mr-2 h-4 w-4" />
												<span>{collection.collectionName}</span>
											</DropdownMenuItem>
										))
									) : (
										<DropdownMenuItem>No hay colecciones</DropdownMenuItem>
									)}
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={openDialog}>
										<Plus className="mr-2 h-4 w-4" />
										<span>Crear colección</span>
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
						<DropdownMenuItem onClick={openDialog}>
							<Plus className="mr-2 h-4 w-4" />
							<span>Crear colección</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Plus className="mr-2 h-4 w-4" />
							<span>Borrar Juego</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			{isDialogOpen && <AddCollection />}
		</>
	)
}
