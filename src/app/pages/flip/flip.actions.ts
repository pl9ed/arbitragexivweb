import { createAction, props } from '@ngrx/store';
import { ItemRow } from './flip.models';

export const loadPrices = createAction(
  '[Flip Prices] Load prices from API',
  props<{ items: number[] }>(),
);

export const pricesLoaded = createAction(
  '[Flip Prices] Finished loading prices from API',
  props<{ items: ItemRow[] }>(),
);
