export interface GemstoneItem {
  name: string;
  id: number;
  area: string;
  cost: number;
}

export interface GemstoneItemPrice {
  name: string;
  id: number;
  minPriceNQ: number;
  velocityNQ: number;
  minPriceHQ: number;
  velocityHQ: number;
  areaName: string;
  unitCost: number;
}
