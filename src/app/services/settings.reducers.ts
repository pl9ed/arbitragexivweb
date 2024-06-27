import { createReducer, on } from '@ngrx/store';
import { SettingsConfig } from './settings.models';
import { produce } from 'immer';
import { loadConfig } from './settings.actions';

export const initialSettingState: SettingsConfig = {
  defaultWorld: 'Lamia',
  flip: {
    dropDownOptions: [],
    itemLists: {
      consumables: [],
      craftingGear: [],
      craftingMats: [],
      materia: [],
    },
  },
  primal: [],
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
