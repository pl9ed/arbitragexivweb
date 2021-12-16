import { Injectable } from '@angular/core';
import { Constants } from '../models/Constants';
import { UniversalisService } from './universalis.service';

@Injectable({
  providedIn: 'root',
})
export class ComparisonService {
  constructor(private prices: UniversalisService) {}

  getNQPrices(id: number): Map<string, number> {
    let priceMap = new Map<string, number>();
    Constants.PRIMAL.forEach((world, i) => {
      setTimeout(
        () =>
          this.prices.getItem(world, id).then(
            (item) => {
              console.log(
                `NQ price for ${id} on ${world} set to ${item.minPriceNQ}`
              );
              priceMap.set(world, item.minPriceNQ);
            },
            (reject) => {
              console.log('getItem rejected: ');
              console.log(reject);
            }
          ),
        200 * i
      );
    });
    return new Map([...priceMap.entries()].sort((k, v) => v[1] - k[1]));
  }

  getHQPrices(id: number): Map<string, number> {
    let priceMap = new Map<string, number>();
    Constants.PRIMAL.forEach((world, i) => {
      setTimeout(
        () =>
          this.prices.getItem(world, id).then(
            (item) => {
              console.log(
                `HQ price for ${id} on ${world} set to ${item.minPriceHQ}`
              );
              priceMap.set(world, item.minPriceNQ);
            },
            (reject) => {
              console.log('getItem rejected: ');
              console.log(reject);
            }
          ),
        200 * i
      );
    });
    return new Map([...priceMap.entries()].sort((k, v) => v[1] - k[1]));
  }
}
