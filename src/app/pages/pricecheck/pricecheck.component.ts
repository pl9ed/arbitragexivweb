import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { SettingsService } from 'src/app/services/settings.service';
import { UniversalisService } from 'src/app/services/universalis.service';
import { XivAPIService } from 'src/app/services/xiv-api.service';

@Component({
  selector: 'app-pricecheck',
  templateUrl: './pricecheck.component.html',
  styleUrls: ['./pricecheck.component.css'],
})
export class PricecheckComponent implements OnInit {
  static itemKey = 'PRICE_CHECK_ITEM';

  items: Item[] = [];
  pricesNQ: number[] = [];
  veloNQ: number[] = [];
  pricesHQ: number[] = [];
  veloHQ: number[] = [];

  headers = [
    'Item',
    'Price (NQ)',
    'Velocity (NQ)',
    'Price (HQ)',
    'Velocity (HQ)',
  ];

  constructor(
    private router: Router,
    private mbAPI: UniversalisService,
    private settings: SettingsService,
    private xivAPI: XivAPIService,
  ) {}

  ngOnInit(): void {
    const itemsString = localStorage.getItem(PricecheckComponent.itemKey);
    const itemArr = JSON.parse(itemsString!);
    if (itemArr.length > 0) {
      this.items = itemArr;
    }

    this.populatePrices();
  }

  async addItem(idString: string) {
    const id = Number(idString);
    try {
      const itemName = (await this.xivAPI.getName(id)).name;
      if (id && itemName) {
        const item: Item = { name: itemName, id };

        this.mbAPI
          .getAllItemsFor(this.settings.homeworld, id, 20)
          .subscribe((response) => {
            this.items.push(item);
            this.pricesNQ.push(response.minPriceNQ);
            this.veloNQ.push(response.nqSaleVelocity);
            this.pricesHQ.push(response.minPriceHQ);
            this.veloHQ.push(response.hqSaleVelocity);
            localStorage.setItem(
              PricecheckComponent.itemKey,
              JSON.stringify(this.items),
            );
            console.log(this.items);
          });
      }
    } catch (e) {
      console.log(`Unable to find item name for id ${id}`);
      console.log(e);
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  async loadDefaults() {
    this.settings.settingsConfig$
      .pipe(
        mergeMap((config) => this.xivAPI.getNames(config.pricechecker.default)),
      )
      .subscribe((items) => {
        this.items = items;
        localStorage.setItem(
          PricecheckComponent.itemKey,
          JSON.stringify(this.items),
        );
        this.populatePrices();
      });
  }

  clearItems() {
    this.items = [];
    localStorage.setItem(
      PricecheckComponent.itemKey,
      JSON.stringify(this.items),
    );
  }

  async populatePrices() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      this.mbAPI
        .getAllItemsFor(this.settings.homeworld, item.id, 20)
        .subscribe((prices) => {
          this.pricesNQ[i] = prices.minPriceNQ;
          this.veloNQ[i] = prices.nqSaleVelocity;
          this.pricesHQ[i] = prices.minPriceHQ;
          this.veloHQ[i] = prices.hqSaleVelocity;
        });

      await this.mbAPI.sleep(50);
    }
  }
}
