import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemResponse } from '../models/ItemResponse';

@Injectable({
  providedIn: 'root'
})
export class UniversalisService {

  MIN_PRICE_NQ_KEY = "minPriceNQ"
  MIN_PRICE_HQ_KEY = "minPriceHQ"
  NQ_VELOCITY_KEY = "nqSaleVelocity"
  HQ_VELOCITY_KEY = "hqSaleVelocity"
  BASE_URL = "https://universalis.app"

  constructor(private http: HttpClient) { }

  async getItem(world: string, id: number): Promise<ItemResponse> {
    const url = `${this.BASE_URL}/api/${world}/${id}`
    return this.http.get<ItemResponse>(url).toPromise()
  }

  sleep(timer: number) {
    return new Promise(resolve => setTimeout(resolve, timer))
  }

}
