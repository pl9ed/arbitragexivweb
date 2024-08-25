import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemResponse } from '../models/ItemResponse';
import { Observable } from 'rxjs';
import { Item } from '../models/Item';
import { ItemRow } from '../pages/flip/flip.models';

@Injectable({
  providedIn: 'root',
})
export class UniversalisService {
  MIN_PRICE_NQ_KEY = 'minPriceNQ';
  MIN_PRICE_HQ_KEY = 'minPriceHQ';
  NQ_VELOCITY_KEY = 'nqSaleVelocity';
  HQ_VELOCITY_KEY = 'hqSaleVelocity';
  BASE_URL = 'https://universalis.app';

  constructor(private http: HttpClient) {}

  getAllItemsFor(
    dataCenter: string,
    id: number,
    listings: number,
  ): Observable<ItemResponse> {
    const url = `${this.BASE_URL}/api/v2/${dataCenter}/${id}?listings=${listings}`;

    return this.http.get<ItemResponse>(url);
  }

  createRow(homePrices: ItemResponse, dcPrices: ItemResponse, item: Item): ItemRow {
    const cheapestNq = dcPrices.listings.find((listing) => !listing.hq);
    const cheapestHq = dcPrices.listings.find((listing) => listing.hq);

    if (cheapestNq?.pricePerUnit !== dcPrices.minPriceNQ) {
      console.log(
        `cheapest HQ item price and minPriceNQ don't match! nq listing price: ${cheapestNq?.pricePerUnit}, minPriceHQ: ${dcPrices.minPriceNQ}`,
      );
    }

    if (cheapestHq?.pricePerUnit !== dcPrices.minPriceHQ) {
      console.log(
        `cheapest HQ item price and minPriceHQ don't match! hq listing listing price: ${cheapestHq?.pricePerUnit}, minPriceHQ: ${dcPrices.minPriceHQ}`,
      );
    }

    const row: ItemRow = {
      name: item.name,
      roiNq: homePrices.minPriceNQ / dcPrices.minPriceNQ,
      homePriceNq: homePrices.minPriceNQ,
      minPriceNq: dcPrices.minPriceNQ,
      worldNq: cheapestNq?.worldName ?? '',
      velocityNq: homePrices.nqSaleVelocity,
      roiHq: homePrices.minPriceHQ / dcPrices.minPriceHQ,
      homePriceHq: homePrices.minPriceHQ,
      minPriceHq: dcPrices.minPriceHQ,
      worldHq: cheapestHq?.worldName ?? '',
      velocityHq: homePrices.hqSaleVelocity,
    };
    return row;
  }

  sleep(timer: number) {
    return new Promise((resolve) => setTimeout(resolve, timer));
  }
}
