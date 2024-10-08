import { createReducer, on } from '@ngrx/store';
import { SettingsConfig } from './settings.models';
import { produce } from 'immer';
import { loadConfig } from './settings.actions';

export const initialSettingState: SettingsConfig = {
  homeworld: 'Lamia',
  flip: {
    dropDownOptions: [],
    itemLists: {
      consumables: [],
      craftingGear: [],
      craftingMats: [],
      materia: [],
    },
  },
  gemstoneItems: [],
  primal: [],
  pricechecker: {
    default: [],
  },
  crafting: {
    items: [],
  },
};

export const settings = createReducer(
  initialSettingState,
  on(loadConfig, (state, action) =>
    produce(state, (draft) => {
      console.log(`Load settings ${draft}`);
      draft = action.newState;
    }),
  ),
);
