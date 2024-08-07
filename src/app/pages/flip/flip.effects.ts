import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  clearData,
  loadPrices,
  pricesLoaded,
  selectItems,
} from './flip.actions';
import { XivAPIService } from '../../services/xiv-api.service';
import { UniversalisService } from '../../services/universalis.service';
import {
  concatMap,
  delay,
  from,
  map,
  mergeMap,
  Observable,
  of,
  withLatestFrom,
} from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { ItemRow } from './flip.models';

@Injectable()
export class FlipPriceEffects {
  constructor(
    private actions$: Actions,
    private xivAPIService: XivAPIService,
    private universalisService: UniversalisService,
    private settings: SettingsService,
  ) {}

  checkPrices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPrices),
      concatMap((action) => {
        return this.settings.settingsConfig$.pipe(
          concatMap((config) => {
            return this.createRow(config.homeworld, action.itemId).pipe(
              map((row) => pricesLoaded({ item: row })),
            );
          }),
        );
      }),
    );
  });

  updateItemSelection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(selectItems),
      concatMap((action) => {
        // eslint-disable-next-line @ngrx/no-multiple-actions-in-effects
        return [
          clearData(),
          ...action.items.map((item) => loadPrices({ itemId: item })),
        ];
      }),
    );
  });

  private createRow(homeworld: string, id: number): Observable<ItemRow> {
    return from(this.xivAPIService.getName(id)).pipe(
      mergeMap((item) =>
        this.universalisService.getAllItemsFor(homeworld, id, 10).pipe(
          delay(50),
          withLatestFrom(
            this.universalisService.getAllItemsFor('primal', id, 50),
            of(item),
          ),
          map(([homePrices, dcPrices, item]) => {
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
          }),
        ),
      ),
    );
  }
}
