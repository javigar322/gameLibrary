import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const { signIn, signOut } = await import("auth-astro/client")

export function UserMenu(props) {
	// permite que un usuario inicie sesión en la aplicación con su cuenta de Twitch
	const handleClickLogin = async (event) => {
		event.stopPropagation()
		try {
			await signIn("twitch")
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
		return <p onClick={handleClickLogin}> {props.usuario} </p>
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>{props.trigger}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={handleClickLogout}>{props.logout}</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
