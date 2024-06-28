import { createAction, props } from '@ngrx/store';
import { GemstoneItem, GemstoneItemPrice } from './gemstone.models';

export const clearData = createAction('[Gemstone] Clearing row data');

export const checkGemstonePrice = createAction(
  '[Gemstone] Check Price',
  props<{ item: GemstoneItem }>(),
);

export const gemstonePriceLoaded = createAction(
  '[Gemstone] Price Loaded',
  props<{ item: GemstoneItemPrice }>(),
);
