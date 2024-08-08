import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemResponse } from '../models/ItemResponse';
import { Observable } from 'rxjs';

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

  sleep(timer: number) {
    return new Promise((resolve) => setTimeout(resolve, timer));
  }
}
