import { createReducer, on } from '@ngrx/store';
import { pricesLoaded } from './flip.actions';
import { produce } from 'immer';
import { FlipPriceState } from './flip.models';

export const initialPriceState: FlipPriceState = { items: [] };

export const flipPrices = createReducer(
  initialPriceState,
  on(pricesLoaded, (state, action) =>
    produce(state, (draft) => {
      console.log('reducer');
      const existingIndex = draft.items.findIndex(
        (row) => row.name === action.item.name,
      );
      if (existingIndex !== -1) {
        draft.items.splice(existingIndex, 1);
      }
      draft.items.push(action.item);
    }),
  ),
);
