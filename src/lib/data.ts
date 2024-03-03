export interface GameTest {
	id: number
	name: string
	url: string
}

export interface Game {
	id: number
	name: string
	cover: number
	aggregated_rating: number
}

const API_URL = "https://api.igdb.com/v4/games"
const CLIENT_ID = import.meta.env.CLIENT_ID
const AUTHORIZATION = import.meta.env.AUTHORIZATION

export const games: GameTest[] = [
	{
		id: 147666,
		name: "Shinobi Blade",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 85450,
		name: "Transformers Prime: The Game",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 95080,
		name: "Dotra",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 104748,
		name: "Space station - build your own ISS",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 89616,
		name: "Bubble Whirl Shooter",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 91579,
		name: "Racing Live",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 263822,
		name: "All Alone",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 124961,
		name: "Railroad Tycoon 2: Platinum Edition",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 133455,
		name: "Let's Cook Together",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 231577,
		name: "Blood Bowl 3: Black Orcs Edition",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 119025,
		name: "Pet Puzzle",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 213046,
		name: "The Ultimate FMV Bundle 2",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 160939,
		name: "Tiger Tank 59 I: A-Gun MP095",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 130740,
		name: "Deathmatch Club",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 41342,
		name: "19: Neunzehn",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 203546,
		name: "Meat & Greed",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 30132,
		name: "Wizards and Warlords",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 176242,
		name: "This hole in my chest",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 99620,
		name: "Shadow Wolf Mysteries: Cursed Wedding - Collector's Edition",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
	{
		id: 230654,
		name: "Hockey de Mesa",
		url: "https://images.igdb.com/igdb/image/upload/t_thumb/co1txm.jpg",
	},
]

export async function getGames(): Promise<Game[]> {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Client-ID": CLIENT_ID,
			"Authorization": `Bearer ${AUTHORIZATION}`,
		},
		body: "fields id, name, cover, aggregated_rating;",
	})
	const data = await response.json()
	console.log(data)
	return data
}
