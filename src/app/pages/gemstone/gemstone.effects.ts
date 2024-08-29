import { Injectable } from '@angular/core';
import { UniversalisService } from '../../services/universalis.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { checkGemstonePrice, gemstonePriceLoaded } from './gemstone.actions';
import { concatMap, from, map } from 'rxjs';
import { GemstoneItemPrice } from './gemstone.models';

@Injectable()
export class GemstonePriceEffects {
  homeworld: string;

  constructor(
    private actions$: Actions,
    private universalisService: UniversalisService,
    private settings: SettingsService,
  ) {
    this.homeworld = this.settings.homeworld;
  }

  checkPrices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkGemstonePrice),
      concatMap((action) => {
        return from(
          this.universalisService.getAllItemsFor(
            this.homeworld,
            action.item.id,
            20,
          ),
        ).pipe(
          map((response) => {
            const price = {
              name: action.item.name,
              id: response.itemID,
              minPriceNQ: response.minPriceNQ,
              velocityNQ: response.nqSaleVelocity,
              minPriceHQ: response.minPriceHQ,
              velocityHQ: response.hqSaleVelocity,
              areaName: action.item.area,
              unitCost: action.item.cost,
            } as GemstoneItemPrice;

            return gemstonePriceLoaded({ item: price });
          }),
        );
      }),
    );
  });
}
