import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  clearData,
  loadPrices,
  pricesLoaded,
  setCategory,
  setItems,
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
  switchMap,
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
      ofType(setCategory),
      switchMap((action) => {
        console.log(action);
        return this.settings.settingsConfig$.pipe(
          map((config) => {
            const category =
              action.category as keyof typeof config.flip.itemLists;
            const items = config.flip.itemLists[category];
            return setItems({ items: items ?? [] });
          }),
        );
      }),
    );
  });

  updateItemPrices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setItems),
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
          delay(300),
          withLatestFrom(
            this.universalisService.getAllItemsFor('primal', id, 50),
            of(item),
          ),
          map(([homePrices, dcPrices, item]) => {
            return this.universalisService.createRow(homePrices, dcPrices, item);
          }),
        ),
      ),
    );
  }
}
