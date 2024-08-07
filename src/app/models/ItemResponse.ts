export interface ItemResponse {
  itemID: number;
  listings: Listing[];
  minPriceNQ: number;
  minPriceHQ: number;
  nqSaleVelocity: number;
  hqSaleVelocity: number;
  unitsForSale: number;
}

export interface Listing {
  pricePerUnit: number;
  quantity: number;
  worldName: string;
  hq: boolean;
}
