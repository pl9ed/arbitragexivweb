import { concatLatestFrom } from '@ngrx/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadPrices, pricesLoaded } from './flip.actions';
import { XivAPIService } from '../../services/xiv-api.service';
import { UniversalisService } from '../../services/universalis.service';
import {
  concatMap,
  from,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
  toArray,
  withLatestFrom,
} from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { ItemRow } from './flip.models';

@Injectable()
export class FlipPriceEffects {
  checkPrices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPrices),
      concatMap((action) => {
        console.log('loading price');
        return this.settings.settingsConfig$.pipe(
          concatMap((config) => {
            return this.createRow(config.defaultWorld, action.itemId).pipe(
              map((row) => {
                console.log(`map row: ${JSON.stringify(row)}`);
                return pricesLoaded({ item: row });
              }),
            );
          }),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private xivAPIService: XivAPIService,
    private universalisService: UniversalisService,
    private settings: SettingsService,
  ) {
    console.log('effect constructor');
  }

  private createRow(homeworld: string, id: number): Observable<ItemRow> {
    console.log('createRow()');
    let minPriceNq: number = Number.MAX_SAFE_INTEGER;
    let worldNq: string;
    let minPriceHq: number = Number.MAX_SAFE_INTEGER;
    let worldHq: string;

    let homePriceNq: number = -1;
    let velocityNq: number = -1;
    let homePriceHq: number = -1;
    let velocityHq: number = -1;

    return from(this.xivAPIService.getName(id)).pipe(
      mergeMap((name) =>
        this.settings.settingsConfig$.pipe(
          mergeMap((config) => config.primal),
          mergeMap((world) =>
            from(this.universalisService.getItem(world, id)).pipe(
              tap((response) => {
                console.log(response);
                if (response.minPriceNQ < minPriceNq) {
                  minPriceNq = response.minPriceNQ;
                  worldNq = world;
                }
                if (response.minPriceHQ < minPriceHq) {
                  minPriceHq = response.minPriceHQ;
                  worldHq = world;
                }

                if (world == homeworld) {
                  homePriceNq = response.minPriceNQ;
                  velocityNq = response.nqSaleVelocity;
                  homePriceHq = response.minPriceHQ;
                  velocityHq = response.hqSaleVelocity;
                }
              }),
            ),
          ),
          toArray(), // Gather all emissions into an array
          map(() => {
            const row: ItemRow = {
              name: name.Name,
              roiNq: homePriceNq / minPriceNq,
              homePriceNq: homePriceNq,
              minPriceNq: minPriceNq,
              worldNq: worldNq,
              velocityNq: velocityNq,
              roiHq: homePriceHq / minPriceHq,
              homePriceHq: homePriceHq,
              minPriceHq: minPriceHq,
              worldHq: worldHq,
              velocityHq: velocityHq,
            };
            console.log(`created row ${row}`);
            return row;
          }),
        ),
      ),
    );
  }
}
