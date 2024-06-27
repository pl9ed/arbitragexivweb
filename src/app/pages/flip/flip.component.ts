/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, Observable } from 'rxjs';
import { Constants } from 'src/app/models/Constants';
import { Item } from 'src/app/models/Item';
import { SettingsConfig } from 'src/app/services/settings.models';
import { SettingsService } from 'src/app/services/settings.service';
import { UniversalisService } from 'src/app/services/universalis.service';
import { XivAPIService } from 'src/app/services/xiv-api.service';
import { ItemRow } from './flip.models';
import { Store } from '@ngrx/store';
import { loadPrices } from './flip.actions';

@Component({
  selector: 'app-flip',
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.css'],
})
export class FlipComponent implements OnInit {
  dropdownText = 'Select Items';
  dropdownTextOptions = [
    'Raid Consumables',
    'Crafting Mats',
    'Crafting Gear',
    'Materia',
  ];
  toggleItems = [
    Constants.CONSUMABLE_ITEM_IDS,
    Constants.CRAFTING_ITEM_IDS,
    Constants.CRAFTING_GEAR_IDS,
    Constants.MATERIA,
  ];

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

  selectedItems$!: Observable<number[]>;

  constructor(
    private router: Router,
    private mbAPI: UniversalisService,
    private settings: SettingsService,
    private xivAPI: XivAPIService,
    private store: Store
  ) {}

  ngOnInit() {
    this.selectedItems$ = this.settings.settingsConfig$.pipe(map(config => config.flip.itemLists.consumables))
    this.selectedItems$.subscribe(items => {
      items.forEach(item => {
        this.store.dispatch(loadPrices({ itemId: item}))
      })
    })
  }

  fillFlipTable() {
    this.dataArray = [];
    let i = 0;
    const interval = 25 + this.flipItemIDs.length * 40;
    for (const item of this.flipItemIDs) {
      setTimeout(async () => {
        const itemName = (await this.xivAPI.getName(item)).Name;

        const prices = await this.getPrices(
          { name: itemName, id: item }
        );
        const nqPrices = prices[0];
        const hqPrices = prices[1];

        const nqWorld = [...nqPrices.keys()][0];
        const hqWorld = [...hqPrices.keys()][0];

        const nqROI =
          (nqPrices.get(this.settings.homeworld) || 0) /
          (nqPrices.get(nqWorld) || 0);
        const hqROI =
          (hqPrices.get(this.settings.homeworld) || 0) /
          (hqPrices.get(hqWorld) || 0);

        const nqVelocity: number = (this.velocityMap.get(itemName) || [])[0];
        const hqVelocity: number = (this.velocityMap.get(itemName) || [])[1];

        const row = [
          itemName,
          nqROI.toFixed(2),
          nqPrices.get(nqWorld),
          nqPrices.get(this.settings.homeworld),
          nqWorld,
          nqVelocity.toFixed(3),
          hqROI.toFixed(2),
          hqPrices.get(hqWorld),
          hqPrices.get(this.settings.homeworld),
          hqWorld,
          hqVelocity.toFixed(3),
        ];
        this.dataArray.push(row);
      }, i * interval);
      i++;
    }
  }

  togglePrices(index: number) {
    this.flipItemIDs = this.toggleItems[index];
    this.dropdownText = this.dropdownTextOptions[index];
    this.fillFlipTable();
  }

  async getPrices(
    item: Item,
  ): Promise<Map<string, number>[]> {
    const nqMap = new Map<string, number>();
    const hqMap = new Map<string, number>();

    for (let i = 0; i < Constants.PRIMAL.length; i++) {
      const world = Constants.PRIMAL[i];
      const prices = await this.mbAPI.getItem(world, item.id);
      nqMap.set(world, prices.minPriceNQ);
      hqMap.set(world, prices.minPriceHQ);
      this.velocityMap.set(item.name, [
        prices.nqSaleVelocity,
        prices.hqSaleVelocity,
      ]);
      await this.mbAPI.sleep(50);
    }

    // remove with no price
    const filteredNQ = new Map<string, number>(
      [...nqMap].filter(([k, v]) => v > 0),
    );
    const filteredHQ = new Map<string, number>(
      [...hqMap].filter(([k, v]) => v > 0),
    );

    const sortedNQ = new Map<string, number>(
      [...filteredNQ.entries()].sort((a, b) => a[1] - b[1]),
    );
    const sortedHQ = new Map<string, number>(
      [...filteredHQ.entries()].sort((a, b) => a[1] - b[1]),
    );

    return [sortedNQ, sortedHQ];
  }
}
