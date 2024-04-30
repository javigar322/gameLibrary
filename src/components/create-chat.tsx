import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const FormSchema = z.object({
	userId: z.string().min(2, {
		message: "El id usuario no es correcto",
	}),
	message: z.string().min(2, {
		message: "El mensaje no es correcto",
	}),
})

export function CreateChat() {
	const { toast } = useToast()

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			userId: "",
			message: "",
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const formData = new FormData()
		console.log(
			"data es " + data + "data.userId es " + data.userId + "data.message es " + data.message
		)
		formData.append("userId", data.userId)
		formData.append("message", data.message)

		const response = await fetch("/api/chats/chats.json", {
			method: "POST",
			body: formData,
		})
		if (response.ok) {
			console.log("Chat creado correctamente.")
			toast({
				title: "Chat creado",
				description: "El chat se ha creado correctamente.",
				action: (
					<ToastAction altText="Borrar notificación" key="Delete">
						Undo
					</ToastAction>
				),
			})
		} else {
			console.log("Error: No se ha podido crear el chat.")
			toast({
				variant: "destructive",
				title: "Error: Chat no creado",
				description: "El Chat no se ha podido crear. Por favor, inténtalo de nuevo.",
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
			<DialogTrigger asChild>
				<Button variant="ghost">
					<Plus size={16} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Crear Chat</DialogTitle>
					<DialogDescription>
						Crea un chat con uno de tus amigos, escribe su id y envíale un mensaje para iniciar la
						conversación.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
						<FormField
							control={form.control}
							name="userId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>User ID</FormLabel>
									<FormControl>
										<Input placeholder="hola" {...field} />
									</FormControl>
									<FormDescription>escribe el id de tu amigo</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel>message</FormLabel>
									<FormControl>
										<Input placeholder="message" {...field} />
									</FormControl>
									<FormDescription>escribe el message</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Enviar</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
