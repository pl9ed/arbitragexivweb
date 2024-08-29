import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  concatMap,
  forkJoin,
  map,
  mergeMap,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { Item } from 'src/app/models/Item';
import { ItemResponse } from 'src/app/models/ItemResponse';
import { SettingsService } from 'src/app/services/settings.service';
import { UniversalisService } from 'src/app/services/universalis.service';
import { XivAPIService } from 'src/app/services/xiv-api.service';
import { emptyIfInvalid, formatDecimal } from 'src/app/utils/number-utils';

@Component({
  selector: 'app-pricecheck',
  templateUrl: './pricecheck.component.html',
  styleUrls: ['./pricecheck.component.css'],
})
export class PricecheckComponent implements OnInit, AfterViewInit, OnDestroy {
  format = formatDecimal;
  emptyIfInvalid = emptyIfInvalid;

  static itemKey = 'PRICE_CHECK_ITEM';

  private destroy$ = new Subject<void>();

  items: Item[] = [];
  displayedColumns: string[] = [
    'name',
    'priceNq',
    'velocityNq',
    'priceHq',
    'velocityHq',
    'actions'
  ];
  dataSource = new MatTableDataSource<PriceCheckRow>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private mbAPI: UniversalisService,
    private settings: SettingsService,
    private xivAPI: XivAPIService,
    private liveAnnouncer: LiveAnnouncer,
  ) {}

  ngOnInit(): void {
    const itemsString = localStorage.getItem(PricecheckComponent.itemKey);
    const itemArr = JSON.parse(itemsString!);
    if (itemArr && itemArr.length > 0) {
      this.items = itemArr;
      this.populatePrices();
    } else {
      this.loadDefaults();
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async addItem(searchTerm: any) {
    let prices$: Observable<[Item, ItemResponse]>;

    if (parseInt(searchTerm)) {
      prices$ = this.addById(searchTerm);
    } else {
      prices$ = this.addByName(searchTerm);
    }

    prices$.subscribe(([item, response]) => {
      this.items.push(item);
      this.dataSource.data = [
        ...this.dataSource.data,
        {
          name: item.name,
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

  private addById(id: number): Observable<[Item, ItemResponse]> {
    return forkJoin([
      this.xivAPI.getName(id),
      this.mbAPI.getAllItemsFor(this.settings.homeworld, id, 20),
    ]).pipe(
      takeUntil(this.destroy$),
      map(([item, response]) => [item, response]),
    );
  }

  private addByName(name: string): Observable<[Item, ItemResponse]> {
    return this.xivAPI
      .search(name)
      .pipe(
        map((result) => {
          return {
            id: result.Results[0].ID,
            name: result.Results[0].Name,
          } as Item;
        }),
      )
      .pipe(
        mergeMap((item) =>
          this.mbAPI
            .getAllItemsFor(this.settings.homeworld, item.id, 20)
            .pipe(map((response) => [item, response] as [Item, ItemResponse])),
        ),
      );
  }

  removeItem(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [...this.dataSource.data];
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

  remove(index: number) {
    this.items.splice(index, 1);
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [...this.dataSource.data];
    localStorage.setItem(
      PricecheckComponent.itemKey,
      JSON.stringify(this.items),
    );
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
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
