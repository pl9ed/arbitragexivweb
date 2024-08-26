import { ItemResponse } from './ItemResponse';

export interface CraftingItem {
  id: number;
  name: string;
  amount: number;
  cost: number;
  ingredients: CraftingItem[];
}

export interface CraftingRow {
  id: number;
  name: string;
  cost: number;
  minPriceNq: number;
  roiNq: number;
  velocityNq: number;
  minPriceHq: number;
  roiHq: number;
  velocityHq: number;
  recipe: CraftingItem[];
}
