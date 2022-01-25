import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  dataMap: Map<Recipe, (string[] | number[])[]> = new Map()

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

  ngOnInit(): void {
    this.getData(PUMPKIN_POTAGE)
  }


  async getData(recipe: Recipe) {
    const itemName = await this.xivAPI.getName(recipe.item)
    const homePriceHQ = (await this.mbAPI.getItem(this.settings.homeworld, recipe.item)).minPriceHQ

    const mats = recipe.materialIds
    const matNames: string[] = []
    const matPrices: number[] = []
    const worlds: string[] = []

    for (let i = 0; i < mats.length; i++) {
      const matName: string = (await this.xivAPI.getName(mats[i])).Name
      matNames.push(matName)

      // for crafting, we only need NQ mats
      const matPrice: PriceResponse = (await this.mbAPI.getMinPriceWorlds(mats[i]))
      matPrices.push(matPrice.priceNQ)
      worlds.push(matPrice.worldNQ)
    }

    const outputArr: (string[]|number[])[] = [
      matNames,
      matPrices,
      worlds
    ]

    this.dataMap.set(recipe, outputArr)
  }

}
