import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemResponse } from '../models/ItemResponse';

@Injectable({
  providedIn: 'root'
})
export class UniversalisService {

  MIN_PRICE_NQ_KEY: string = "minPriceNQ"
  MIN_PRICE_HQ_KEY: string = "minPriceHQ"
  NQ_VELOCITY_KEY: string = "nqSaleVelocity"
  HQ_VELOCITY_KEY: string = "hqSaleVelocity"
  baseURL: string = "https://universalis.app"

  constructor(private http: HttpClient) { }

  async getItem(world: string, id: Number): Promise<ItemResponse> {
    let url = `${this.baseURL}/api/${world}/${id}`
    return this.http.get<ItemResponse>(url).toPromise()
  }

}
