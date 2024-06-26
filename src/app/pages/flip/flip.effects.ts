import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadPrices } from './flip.actions';
import { XivAPIService } from '../../services/xiv-api.service';
import { UniversalisService } from '../../services/universalis.service';
import { exhaustMap, flatMap, from, map, mergeMap, switchMap, zip } from 'rxjs';
import { SettingsConfig } from 'src/app/services/settings.models';
import { SettingsService } from 'src/app/services/settings.service';
import { ItemRow } from './flip.models';

@Injectable()
export class FlipPriceEffects {
  checkPrices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPrices),
      switchMap((action) => {
        return from(this.xivAPIService.getNames(action.items)).pipe(
          mergeMap((items) => {
            console.log(items);
            let rows: ItemRow[] = [];
            items.forEach(item => {
                this.universalisService.getItem()
            })
            this.universalisService.getItem()
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
  ) {}

  private createRow
}
