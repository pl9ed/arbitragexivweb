import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/Constants';
import { PriceResponse } from 'src/app/models/PriceResponse';
import { PUMPKIN_POTAGE, Recipe } from 'src/app/models/Recipe';
import { SettingsService } from 'src/app/services/settings.service';
import { UniversalisService } from 'src/app/services/universalis.service';
import { XivAPIService } from 'src/app/services/xiv-api.service';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.css']
})
export class CraftingComponent implements OnInit {

  dataMap: Map<string, (string | number)[][]> = new Map()
  roiMap: Map<string, number[]> = new Map()

  /**
   * 2 arrays/tables? 
   * ITEM NAME | MAT TOTAL | ROI
   * VALUE | VALUE | VALUE
   * 
   * MAT1 | COST | WORLD
   * MAT2 | COST | WORLD
   * ...
   * MATN | COST | WORLD
   */

  constructor(private xivAPI: XivAPIService, private mbAPI: UniversalisService, private router: Router, private settings: SettingsService) { }

  async ngOnInit(): Promise<void> {
    for (let i = 0; i < Constants.DEFAULT_CUL_ITEMS.length; i++) {
      await this.getData(Constants.DEFAULT_CUL_ITEMS[i])
    }
    for (let i = 0; i< Constants.DEFAULT_ALC_ITEMS.length; i++) {
      await this.getData(Constants.DEFAULT_ALC_ITEMS[i])
    }
  }


  async getData(recipe: Recipe): Promise<(string | number)[][]> {
    const itemName = await this.xivAPI.getName(recipe.item)
    const homePriceHQ = (await this.mbAPI.getItem(this.settings.homeworld, recipe.item)).minPriceHQ

    const mats = recipe.materialIds
    const matNames: string[] = []
    const matAmt: number[] = []
    const matPrices: number[] = []
    const worlds: string[] = []

    for (let i = 0; i < mats.length; i++) {
      const matName: string = (await this.xivAPI.getName(mats[i])).Name
      matNames.push(matName)
      matAmt.push(recipe.materialAmounts[i])

      // for crafting, we only need NQ mats
      const matPrice: PriceResponse = (await this.mbAPI.getMinPriceWorlds(mats[i]))
      matPrices.push(matPrice.priceNQ)
      worlds.push(matPrice.worldNQ)
    }

    const outputArr: (string|number)[][] = [
      matNames,
      matPrices,
      worlds
    ]

    this.dataMap.set(itemName.Name, outputArr)

    this.getROIData(itemName.Name, homePriceHQ, matAmt, matPrices)

    return outputArr
  }

  getROIData(itemName: string, itemPrice: number, matAmt: number[], matPrices: number[], craftedAmt: number = 3) {
    let sum = this.getSum(matAmt, matPrices)
    const roi = (itemPrice * craftedAmt) / sum
    this.roiMap.set(itemName, [sum, roi])
  }

  getSum(matAmt: number[], matPrices: number[]): number {
    let sum = 0
    matPrices.forEach((price, index) => {
      const matPrice = price * matAmt[index]
      sum+=matPrice
    })
    return sum
  }

}
