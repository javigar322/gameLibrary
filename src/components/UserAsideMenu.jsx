import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Github, Twitch, Globe } from "lucide-react"
const { signIn, signOut } = await import("auth-astro/client")

export function UserMenu(props) {
	// permite que un usuario inicie sesión en la aplicación con su cuenta de Twitch, google o github
	const handleClickLogin = async (event, login) => {
		event.stopPropagation()
		try {
			await signIn(login)
		} catch (error) {
			console.error("Failed to sign in", error)
		}
	}
	// permite que un usuario cierre su sesión en la aplicación
	const handleClickLogout = async (event) => {
		event.stopPropagation()

		await signOut()
	}
	if (!props.data) {
		return (
			<Dialog>
				<DialogTrigger>
					<p>{props.usuario}</p>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Iniciar Sesión</DialogTitle>
						<DialogDescription>
							<div className="flex w-full flex-col p-5">
								<Button
									className="bg-purple-400"
									onClick={(event) => handleClickLogin(event, "twitch")}
								>
									<Twitch /> Iniciar con twitch
								</Button>
								<Button
									className="bg-slate-600"
									onClick={(event) => handleClickLogin(event, "github")}
								>
									<Github /> Iniciar con github
								</Button>
								<Button className="bg-white" onClick={(event) => handleClickLogin(event, "google")}>
									<Globe /> Iniciar con google
								</Button>
							</div>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		)
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>{props.trigger}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={handleClickLogout}>{props.logout}</DropdownMenuItem>
					<DropdownMenuItem>
						<a className="w-full" href="/admin/dashboard">
							admin
						</a>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
