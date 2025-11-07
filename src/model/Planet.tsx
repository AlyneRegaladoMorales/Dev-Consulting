import type { Character } from "./Character";

export interface Planet {
    id: number,
    name: string,
    characters: Character[],
}