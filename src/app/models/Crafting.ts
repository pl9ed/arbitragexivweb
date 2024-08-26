import { ItemResponse } from "./ItemResponse";

export interface CraftingItem {
    id: number,
    name: string,
    itemResponse: ItemResponse,
    ingredients: CraftingItem[]
}

