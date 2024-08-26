import { ItemResponse } from "./ItemResponse";

export interface CraftingItem {
    id: number,
    amount: number
    ingredients: CraftingItem[]
}

export interface CraftingRow {
    id: number,
    name: string,
    costNq: number,
    minPriceNq: number,
    roiNq: number,
    velocityNq: number,
    costHq: number,
    minPriceHq: number,
    roiHq: number,
    velocityHq: number,
}
