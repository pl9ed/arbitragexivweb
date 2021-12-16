import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants, GemstoneItem } from 'src/app/models/Constants';
import { GemstoneItemPrice } from 'src/app/models/GemstoneItemPrice';
import { Item } from 'src/app/models/Item';
import { ItemResponse } from 'src/app/models/ItemResponse';
import { ComparisonService } from 'src/app/services/comparison.service';
import { UniversalisService } from 'src/app/services/universalis.service';

export interface ItemRow {
  item: string;
  nqROI: number;
  nqMinPrice: number;
  nqHomePrice: number;
  nqMinPriceWorld: string;
  nqVelocity: number;
  hqROI: number;
  hqMinPrice: number;
  hqHomePrice: number;
  hqMinPriceWorld: string;
  hqVelocity: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  headers = [
    'Item',
    'ROI (NQ)',
    'Min Price (NQ)',
    'Home Price (NQ)',
    'Min Price World (NQ)',
    'Velocity (NQ)',
    'ROI (HQ)',
    'Min Price (HQ)',
    'Home Price (HQ)',
    'Min Price World (HQ)',
    'Velocity (HQ)',
  ];
  gemstoneHeaders = [
    'Item',
    'ID',
    'Unit Price (NQ)',
    'Price (NQ)',
    'Velocity (NQ)',
    // "Price (HQ)",
    // "Velocity (HQ)",
    'Region',
  ];
  dataArray: ItemRow[] = [];
  flipItemIDs = Constants.TEST_ITEM_IDS;
  gemstoneItems: GemstoneItemPrice[] = [];

  constructor(private router: Router, private mbAPI: UniversalisService) {}

  ngOnInit() {}

  fillFlipTable() {
    let i = 0;
    for (const item of Constants.TEST_ITEM_IDS) {
      setTimeout(() => {
        this.getPrices(item, Constants.DEFAULT_HOMEWORLD)
      }, i * 200);
      i++;
    }
  }

  getGemstoneData(world: string = Constants.DEFAULT_HOMEWORLD): void {
    Constants.GEMSTONE_ITEMS_LVL1.forEach((item, i) => {
      setTimeout(() => {
        this.mbAPI.getItem(world, item.id).then((response) => {
          let itemInfo = new GemstoneItemPrice(
            item.name,
            item.id,
            response.minPriceNQ,
            response.nqSaleVelocity,
            item.area,
            response.minPriceNQ / item.cost
          );
          this.gemstoneItems[i] = itemInfo;
        });
      }, 500 * i);
    });
  }

  async getPrices(item: Item, homeworld: string) {
    let nqMap = new Map<string, number>();
    let hqMap = new Map<string, number>();

    for (let i = 0; i < Constants.PRIMAL.length; i++) {
      let world = Constants.PRIMAL[i]
      let prices = await this.mbAPI.getItem(world, item.id)
      nqMap.set(world, prices.minPriceNQ)
      this.sleep(500)
    }
    
    console.log(nqMap);
    let sortedNQ = new Map<string, number>([...nqMap.entries()].sort((a,b) => b[1] - a[1]))
    console.log(sortedNQ)
  }

  sleep(timer: number) {
    return new Promise(resolve => setTimeout(resolve, timer))
  }
}
