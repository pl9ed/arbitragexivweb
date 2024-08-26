import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  combineLatest,
  delay,
  forkJoin,
  map,
  mergeMap,
  Observable,
  reduce,
  switchMap,
  toArray,
} from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { UniversalisService } from '../../services/universalis.service';
import { CraftingItem, CraftingRow } from 'src/app/models/Crafting';
import { XivAPIService } from 'src/app/services/xiv-api.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { emptyIfInvalid, formatDecimal } from 'src/app/utils/number-utils';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrl: './crafting.component.css',
})
export class CraftingComponent implements OnInit, AfterViewInit {
  format = formatDecimal;
  emptyIfInvalid = emptyIfInvalid;

  displayedColumns: string[] = [
    'name',
    'cost',
    'minPriceNq',
    'roiNq',
    'velocityNq',
    'minPriceHq',
    'roiHq',
    'velocityHq',
  ];

  homeworld: string;
  items$: Observable<CraftingItem[]>;
  row$!: Observable<CraftingRow[]>;

  dataSource = new MatTableDataSource<CraftingRow>([]);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private settings: SettingsService,
    private universalisService: UniversalisService,
    private xivApiService: XivAPIService,
    private liveAnnouncer: LiveAnnouncer,
  ) {
    this.items$ = this.settings.settingsConfig$.pipe(
      map((config) => config.crafting.items),
    );
    this.homeworld = this.settings.homeworld;
  }

  ngOnInit() {
    this.row$ = this.items$.pipe(
      mergeMap((items) => items),
      delay(200),
      switchMap((item) => this.mapToCraftingRow(item)),
      toArray(),
    );

    this.row$.subscribe((data) => (this.dataSource.data = data));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  private mapToCraftingRow(item: CraftingItem): Observable<CraftingRow> {
    const costTotal$ = forkJoin(
      item.ingredients.map((ingredient) =>
        this.universalisService
          .getAllItemsFor(this.homeworld, ingredient.id, 20)
          .pipe(
            map(
              (response) =>
                Math.max(response.minPriceNQ, response.minPriceHQ) *
                ingredient.amount,
            ),
          ),
      ),
    ).pipe(map((costs) => costs.reduce((acc, cost) => acc + cost, 0)));

    const itemName$ = this.xivApiService.getName(item.id);

    return combineLatest([
      itemName$,
      costTotal$,
      this.universalisService.getAllItemsFor(this.homeworld, item.id, 20),
    ]).pipe(
      map(([name, cost, response]) => {
        return {
          id: item.id,
          name: name.name,
          cost: cost,
          minPriceNq: response.minPriceNQ,
          roiNq: (item.amount * response.minPriceNQ) / cost,
          velocityNq: response.nqSaleVelocity,
          minPriceHq: response.minPriceHQ,
          roiHq: (item.amount * response.minPriceHQ) / cost,
          velocityHq: response.hqSaleVelocity,
          recipe: [], 
        };
      }),
    );
  }
}
