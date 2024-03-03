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
	const handleClickLogin = async (event) => {
		event.stopPropagation()
		await signIn("twitch")
	}
	const handleClickLogout = async (event) => {
		event.stopPropagation()
		await signOut()
	}
	console.log(props.data)
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
