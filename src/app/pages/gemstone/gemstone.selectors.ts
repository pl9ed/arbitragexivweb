import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GemstonePriceState } from './gemstone.models';

export const selectGemstoneState =
  createFeatureSelector<GemstonePriceState>('gemstonePrices');

export const selectGemstonePrices = createSelector(
  selectGemstoneState,
  (state: GemstonePriceState) => state.prices,
);
