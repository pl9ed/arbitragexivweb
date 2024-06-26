import { createFeatureSelector } from '@ngrx/store';
import { ItemRow } from './flip.models';

export const selectItemPrices =
  createFeatureSelector<ReadonlyArray<ItemRow>>('prices');
