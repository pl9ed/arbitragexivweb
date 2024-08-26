import { ItemResponse } from "./ItemResponse";

export interface CraftingRecipe {
    id: number,
    ingredients: CraftingRecipe[]
}

export interface CraftingRow {
    id: number,
    name: string,
    minPriceNq: number,
    roiNq: number,
    velocityNq: number,
    minPriceHq: number,
    roiHq: number,
    velocityHq: number,
}
