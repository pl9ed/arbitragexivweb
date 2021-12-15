import { Injectable } from '@angular/core';
import { UniversalisService } from './universalis.service';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  MIN_PRICE_NQ_KEY: string = "minPriceNQ"
  MIN_PRICE_HQ_KEY: string = "minPriceHQ"
  NQ_VELOCITY_KEY: string = "nqSaleVelocity"
  HQ_VELOCITY_KEY: string = "hqSaleVelocity"

  constructor(private universalis: UniversalisService) { }

  getValue(id: Number, world: string) {
    this.universalis.getItem(world, id)
  }

}
