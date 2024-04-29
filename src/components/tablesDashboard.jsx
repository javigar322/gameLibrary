import { GamePage } from "@/components/tables/gamePage"
import { UserPage } from "@/components/tables/userPage"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TablesDashboard() {
	return (
		<Tabs defaultValue="games" className="w-full">
			<TabsList>
				<TabsTrigger value="users">Users</TabsTrigger>
				<TabsTrigger value="games">Games</TabsTrigger>
			</TabsList>
			<TabsContent value="users">
				<UserPage />
			</TabsContent>
			<TabsContent value="games">
				<GamePage />
			</TabsContent>
		</Tabs>
	)
}
