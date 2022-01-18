import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/Recipe';
import { SettingsService } from 'src/app/services/settings.service';
import { UniversalisService } from 'src/app/services/universalis.service';
import { XivAPIService } from 'src/app/services/xiv-api.service';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.css']
})
export class CraftingComponent implements OnInit {

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
  }


  async getData(recipe: Recipe) {
    const itemName = await this.xivAPI.getName(recipe.item)
    const homePriceHQ = (await this.mbAPI.getItem(this.settings.homeworld, recipe.item)).minPriceHQ

    const mats = recipe.materialIds
    const matNames: string[] = []

    for (let i = 0; i < mats.length; i++) {

    }
    
  }

}
