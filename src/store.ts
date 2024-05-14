import { atom } from "nanostores"
import type { Game } from "./types/game"

export const reload = atom(false)
export const newGame = atom(0)
export const userGames = atom<Game[]>([])
