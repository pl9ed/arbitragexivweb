import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../models/Constants';
import { ItemResponse } from '../models/ItemResponse';
import { PriceResponse } from '../models/PriceResponse';
import { Region } from '../models/Region';

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

  async getMinPriceWorlds(id: number): Promise<PriceResponse> {
    let ret: PriceResponse = {
      worldNQ: "",
      priceNQ: -1,
      worldHQ: "",
      priceHQ: -1
    }

    for( let i = 0; i < Constants.PRIMAL.length; i++) {
      const world = Constants.PRIMAL[i]
      const response = await this.getItem(world, id)

      const priceNQ = response.minPriceNQ
      const priceHQ = response.minPriceHQ

      if (i == 1) {
        // init with values from first world
        ret.worldNQ = world
        ret.worldHQ = world
        ret.priceNQ = response.minPriceNQ
        ret.priceHQ = response.minPriceHQ
      } else {
        if (priceNQ < ret.priceNQ) {
          ret.worldNQ = world
          ret.priceNQ = priceNQ
        }

        if (priceHQ < ret.priceHQ) {
          ret.worldHQ = world
          ret.priceHQ = priceHQ
        }
      }
    }

    return ret
  }

  sleep(timer: number) {
    return new Promise(resolve => setTimeout(resolve, timer))
  }

}
