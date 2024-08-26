import { GemstoneItem } from '../pages/gemstone/gemstone.models';

export interface SettingsConfig {
  homeworld: string;
  primal: string[];
  flip: {
    dropDownOptions: string[];
    itemLists: {
      consumables: number[];
      craftingGear: number[];
      craftingMats: number[];
      materia: number[];
    };
  };
  gemstoneItems: GemstoneItem[];
  pricechecker: {
    default: number[];
  };
  crafting: {
    items: number[]
  }
}
