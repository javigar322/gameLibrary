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
					Email
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
			const game = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(game.AppID.toString())}>
							Copy game ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View game</DropdownMenuItem>
						<DropdownMenuItem>View game details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
