import type { User } from "@/types/user"
import { useEffect, useState } from "react"
import AsideMenuItem from "@/components/AsideMenuItem.astro"

export function UserChats() {
	const [data, setData] = useState<any[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`http://localhost:4321/api/chats/chats.json`)
				const data: any[] = await response.json()
				setData(data)
				console.log(data)
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}
		fetchData()
	}, [])

	return (
		<div>
			{!data ? (
				<div>not found</div>
			) : (
				data.map((user, index) => (
					<a
						href={`/chat/${user.chatId[index]}`}
						className="flex items-center gap-6 px-5 py-3 font-medium text-muted-foreground transition duration-300 hover:text-foreground"
					>
						<img
							src={user.userImage}
							className="rounded-full"
							alt="imagen del usuario"
							height={24}
							width={24}
						/>
						{user.username}
					</a>
				))
			)}
		</div>
	)
}
