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
  dropdownText = "Select Items"
  dropdownTextOptions = [
    "Raid Consumables",
    "Crafting Mats",
    "Crafting Weapons"
  ]
  toggleItems = [
    Constants.CONSUMABLE_ITEM_IDS,
    Constants.CRAFTING_ITEM_IDS,
    Constants.CRAFTING_GEAR_IDS
  ]

  homeworld = Constants.DEFAULT_HOMEWORLD
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
  velocityMap: Map<string, number[]> = new Map<string, number[]>();
  dataArray: any[] = [];
  flipItemIDs = Constants.CONSUMABLE_ITEM_IDS;

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
  gemstoneItems: GemstoneItemPrice[] = [];

  constructor(private router: Router, private mbAPI: UniversalisService) { }

  ngOnInit() { }

  fillFlipTable() {
    this.dataArray = []
    let i = 0;
    let interval = this.flipItemIDs.length * 40
    console.log(`${interval}`)
    for (const item of this.flipItemIDs) {
      setTimeout(async () => {
        let prices = await this.getPrices(item, Constants.DEFAULT_HOMEWORLD)
        let nqPrices = prices[0]
        let hqPrices = prices[1]

        const nqWorld = [...nqPrices.keys()][0]
        const hqWorld = [...hqPrices.keys()][0]

        let nqROI = nqPrices.get(this.homeworld) / nqPrices.get(nqWorld)
        let hqROI = hqPrices.get(this.homeworld) / hqPrices.get(hqWorld)

        let nqVelocity: number = this.velocityMap.get(item.name)[0]
        let hqVelocity: number = this.velocityMap.get(item.name)[1]

        let row = [
          item.name,
          nqROI.toFixed(2),
          nqPrices.get(nqWorld),
          nqPrices.get(this.homeworld),
          nqWorld,
          nqVelocity.toFixed(3),
          hqROI.toFixed(2),
          hqPrices.get(hqWorld),
          hqPrices.get(this.homeworld),
          hqWorld,
          hqVelocity.toFixed(3)
        ]
        this.dataArray.push(row)

      }, i * interval);
      i++;
    }
  }

  togglePrices(index: number) {
    this.flipItemIDs = this.toggleItems[index]
    this.dropdownText = this.dropdownTextOptions[index]
    this.fillFlipTable()
  }

  async getPrices(item: Item, homeworld: string): Promise<Map<string, number>[]> {
    let nqMap = new Map<string, number>();
    let hqMap = new Map<string, number>();

    for (let i = 0; i < Constants.PRIMAL.length; i++) {
      let world = Constants.PRIMAL[i]
      let prices = await this.mbAPI.getItem(world, item.id)
      nqMap.set(world, prices.minPriceNQ)
      hqMap.set(world, prices.minPriceHQ)
      this.velocityMap.set(item.name, [prices.nqSaleVelocity, prices.hqSaleVelocity])
      await this.sleep(500)
    }

    // remove with no price
    let filteredNQ = new Map<string, number>([...nqMap].filter(([k, v]) => v > 0))
    let filteredHQ = new Map<string, number>([...hqMap].filter(([k, v]) => v > 0))

    let sortedNQ = new Map<string, number>([...filteredNQ.entries()].sort((a, b) => a[1] - b[1]))
    let sortedHQ = new Map<string, number>([...filteredHQ.entries()].sort((a, b) => a[1] - b[1]))

    return [sortedNQ, sortedHQ]
  }

  // GEMSTONE

  getGemstoneData(world: string = Constants.DEFAULT_HOMEWORLD): void {
    Constants.GEMSTONE_ITEMS_LVL1.forEach((item, i) => {
      setTimeout(() => {
        this.mbAPI.getItem(world, item.id).then((response) => {
          console.log(response)
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

  sleep(timer: number) {
    return new Promise(resolve => setTimeout(resolve, timer))
  }
}
