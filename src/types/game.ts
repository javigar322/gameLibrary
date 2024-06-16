export interface Game {
	"_id": string
	"AppID": number
	"Name": string
	"Release date": string
	"Estimated owners": string
	"Peak CCU": number
	"Required age": number
	"Price": number
	"DLC count": number
	"About the game": string
	"Supported languages": string[]
	"Full audio languages": string[]
	"Header image": string
	"Website": string
	"Windows": boolean
	"Mac": boolean
	"Linux": boolean
	"Metacritic score": number
	"User score": number
	"Positive": number
	"Negative": number
	"Achievements": number
	"Recommendations": number
	"Average playtime forever": number
	"Average playtime two weeks": number
	"Median playtime forever": number
	"Median playtime two weeks": number
	"Developers": string
	"Publishers": string
	"Categories": string
	"Genres": string
	"Tags": string
	"Screenshots": string
	"Movies": string
}

export interface GameForm {
	"Name"?: string
	"Release date"?: string
	"Genres"?: string
	"Tags"?: string
	"Screenshots"?: string
	"Movies"?: string
	"Developers"?: string
	"Publishers"?: string
	"Price"?: number
}
