import { createReducer, on } from '@ngrx/store';
import { loadPrices } from './flip.actions';
import { produce } from 'immer';
import { ItemRow } from './flip.models';

export const initialPriceState: PriceState = { items: [] };

export const flipPrices = createReducer(
  initialPriceState,
  on(loadPrices, (state, action) =>
    produce(state, (draft) => {
      draft.items = action.prices;
    }),
  ),
);

export interface PriceState {
  items: ItemRow[];
}
