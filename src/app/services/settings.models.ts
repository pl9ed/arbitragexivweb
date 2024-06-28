export interface SettingsConfig {
  homeworld: string;
  flip: {
    dropDownOptions: string[];
    itemLists: {
      consumables: number[];
      craftingGear: number[];
      craftingMats: number[];
      materia: number[];
    };
  };
  primal: string[];
}
