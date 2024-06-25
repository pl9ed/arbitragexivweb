export interface SettingsConfig {
  defaultWorld: string,
  flip: {
    dropDownOptions: string[],
    itemLists: {
      consumables: number[],
      craftingGear: number[],
      craftingMats: number[],
      materia: number[]
    }
  }
  primal: string[]
}
