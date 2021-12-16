import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants, GemstoneItem } from 'src/app/models/Constants';
import { GemstoneItemPrice } from 'src/app/models/GemstoneItemPrice';
import { ItemResponse } from 'src/app/models/ItemResponse';
import { ComparisonService } from 'src/app/services/comparison.service';
import { UniversalisService } from 'src/app/services/universalis.service';

export interface ItemRow {
  item: string,
  nqROI: number,
  nqMinPrice: number,
  nqHomePrice: number,
  nqMinPriceWorld: string,
  nqVelocity: number,
  hqROI: number,
  hqMinPrice: number,
  hqHomePrice: number,
  hqMinPriceWorld: string,
  hqVelocity: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  headers = [
    "Item",
    "ROI (NQ)",
    "Min Price (NQ)",
    "Home Price (NQ)",
    "Min Price World (NQ)",
    "Velocity (NQ)",
    "ROI (HQ)",
    "Min Price (HQ)",
    "Home Price (HQ)",
    "Min Price World (HQ)",
    "Velocity (HQ)",
  ]
  gemstoneHeaders = [
    "Item",
    "ID",
    "Unit Price (NQ)",
    "Price (NQ)",
    "Velocity (NQ)",
    // "Price (HQ)",
    // "Velocity (HQ)",
    "Region"
  ]
  flipItemIDs = Constants.TEST_ITEM_IDS
  gemstoneItems: GemstoneItemPrice[] = []

  constructor(
    private router: Router,
    private comparison: ComparisonService,
    private mbAPI: UniversalisService
  ) {

  }

  ngOnInit() {

  }

  fillFlipTable() {
    Constants.TEST_ITEM_IDS.forEach((id, i) => {
      setTimeout(() =>
        this.getFlipData(id)
        , 500 * i)
    })
  }

  getFlipData(id: number): void {
    let nqMap = this.comparison.getNQPrices(id)
    let hqMap = this.comparison.getHQPrices(id)
  }

  getGemstoneData(world: string = Constants.DEFAULT_HOMEWORLD): void {
    Constants.GEMSTONE_ITEMS_LVL1.forEach((item, i) => {
      setTimeout(() => {
        this.mbAPI.getItem(world, item.id).then(response => {
          let itemInfo = new GemstoneItemPrice(item.name, item.id, response.minPriceNQ, response.nqSaleVelocity, item.area, (response.minPriceNQ / item.cost))
          this.gemstoneItems[i] = itemInfo
        })
      }, 500 * i)
    })
  }

}
