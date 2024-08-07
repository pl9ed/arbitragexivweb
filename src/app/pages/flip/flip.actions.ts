import { createAction, props } from '@ngrx/store';
import { ItemRow } from './flip.models';

export const loadPrices = createAction(
  '[Flip Prices] Load price from API',
  props<{ itemId: number }>(),
);

export const pricesLoaded = createAction(
  '[Flip Prices] Finished loading price from API',
  props<{ item: ItemRow }>(),
);

export const clearData = createAction('[Flip Prices] Clearing row data');

export const setCategory = createAction('[Flip Prices] Select item category', props<{ category: string }>())

export const setItems = createAction(
  '[Flip Prices] Set selected items',
  props<{ items: number[] }>(),
);
