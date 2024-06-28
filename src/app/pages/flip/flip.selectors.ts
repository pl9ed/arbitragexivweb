import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlipPriceState } from './flip.models';

export const selectItemPrices =
  createFeatureSelector<FlipPriceState>('flipPrices');

export const selectItemRows = createSelector(
  selectItemPrices,
  (state: FlipPriceState) => state.prices,
);

export const selectCategory = createSelector(
  selectItemPrices,
  (state: FlipPriceState) => state.itemCategory,
);
