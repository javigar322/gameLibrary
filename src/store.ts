import { atom } from "nanostores"
import { persistentAtom } from "@nanostores/persistent"
import type { Game } from "./types/game"
import type { Collection } from "./types/collection"

export const reload = atom(false)
export const newGame = atom(0)
export const userGames = persistentAtom<Game[]>("games", [], {
	encode: JSON.stringify,
	decode: JSON.parse,
})

export const userCollections = atom<Collection[]>([])
export const draggedGame = atom<Game | null>(null)
export const allGames = atom<Game[]>([])
