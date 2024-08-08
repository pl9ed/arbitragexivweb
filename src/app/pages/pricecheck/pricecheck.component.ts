import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = [
    'name',
    'priceNq',
    'velocityNq',
    'priceHq',
    'velocityHq',
  ];
  dataSource = new MatTableDataSource<PriceCheckRow>([]);

  headers = [
    'Item',
    'Price (NQ)',
    'Velocity (NQ)',
    'Price (HQ)',
    'Velocity (HQ)',
  ];

  constructor(
    private mbAPI: UniversalisService,
    private settings: SettingsService,
    private xivAPI: XivAPIService,
  ) {}

  ngOnInit(): void {
    const itemsString = localStorage.getItem(PricecheckComponent.itemKey);
    const itemArr = JSON.parse(itemsString!);
    if (itemArr.length > 0) {
      this.items = itemArr;
      this.populatePrices();
    } else {
      this.loadDefaults();
    }
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
            this.dataSource.data = [
              ...this.dataSource.data,
              {
                name: itemName,
                priceNq: response.minPriceNQ,
                velocityNq: response.nqSaleVelocity,
                priceHq: response.minPriceHQ,
                velocityHq: response.hqSaleVelocity,
              },
            ];
            localStorage.setItem(
              PricecheckComponent.itemKey,
              JSON.stringify(this.items),
            );
          });
      }
    } catch (e) {
      console.log(`Unable to find item name for id ${id}`);
      throw e;
    }
  }

  removeItem(index: number) {
    this.dataSource.data = this.dataSource.data.splice(index, 1);
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
    this.dataSource.data = [];
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
          this.dataSource.data = [
            ...this.dataSource.data,
            {
              name: item.name,
              priceNq: prices.minPriceNQ,
              velocityNq: prices.nqSaleVelocity,
              priceHq: prices.minPriceHQ,
              velocityHq: prices.hqSaleVelocity,
            },
          ];
        });
      await this.mbAPI.sleep(50);
    }
  }
}

interface PriceCheckRow {
  name: string;
  priceNq: number;
  velocityNq: number;
  priceHq: number;
  velocityHq: number;
}
