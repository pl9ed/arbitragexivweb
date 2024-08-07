export interface ItemRow {
  name: string;
  roiNq: number;
  homePriceNq: number;
  minPriceNq: number;
  worldNq: string;
  velocityNq: number;
  roiHq: number;
  homePriceHq: number;
  minPriceHq: number;
  worldHq: string;
  velocityHq: number;
}

export interface FlipPriceState {
  itemCategory: string;
  items: number[];
  prices: ItemRow[];
}

export interface DropdownOptions {
  property: string;
  display: string;
}
