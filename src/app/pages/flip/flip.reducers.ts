import { createReducer, on } from '@ngrx/store';
import {
  clearData as clearPrices,
  pricesLoaded,
  selectItems,
} from './flip.actions';
import { produce } from 'immer';
import { FlipPriceState } from './flip.models';

export const initialPriceState: FlipPriceState = {
  itemCategory: 'Select Items',
  items: [],
  prices: [],
};

export const flipPrices = createReducer(
  initialPriceState,
  on(pricesLoaded, (state, action) =>
    produce(state, (draft) => {
      const existingIndex = draft.prices.findIndex(
        (row) => row.name === action.item.name,
      );
      if (existingIndex !== -1) {
        draft.prices.splice(existingIndex, 1);
      }
      draft.prices.push(action.item);
    }),
  ),
  on(selectItems, (state, action) =>
    produce(state, (draft) => {
      draft.itemCategory = action.dropdownText;
      draft.items = action.items;
    }),
  ),
  on(clearPrices, (state) =>
    produce(state, (draft) => {
      draft.prices = [];
    }),
  ),
);
