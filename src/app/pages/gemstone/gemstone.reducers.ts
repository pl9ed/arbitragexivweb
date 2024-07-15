import { createReducer, on } from '@ngrx/store';
import { GemstonePriceState } from './gemstone.models';
import { clearData, gemstonePriceLoaded } from './gemstone.actions';
import { produce } from 'immer';

export const initialPriceState: GemstonePriceState = {
  prices: [],
};

export const gemstonePrices = createReducer(
  initialPriceState,
  on(gemstonePriceLoaded, (state, action) =>
    produce(state, (draft) => {
      const existingIndex = draft.prices.findIndex(
        (row) => row.name == action.item.name,
      );
      if (existingIndex != -1) {
        draft.prices.splice(existingIndex, 1);
      }

      draft.prices.push(action.item);
    }),
  ),
  on(clearData, (_) => {
    return initialPriceState;
  }),
);
