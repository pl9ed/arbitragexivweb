import { createAction, props } from '@ngrx/store';
import { SettingsConfig } from './settings.models';

export const loadConfig = createAction(
  '[Settings] Load config from yml',
  props<{ newState: SettingsConfig }>(),
);
