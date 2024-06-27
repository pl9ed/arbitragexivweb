import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlipPriceState } from './flip.models';

export const selectItemPrices =
  createFeatureSelector<FlipPriceState>('flipPrices');

export const selectItemRows = createSelector(
  selectItemPrices,
  (state: FlipPriceState) => state.items,
);
