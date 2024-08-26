import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  combineLatest,
  concatMap,
  delay,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
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
    'recipe',
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
    this.items$
      .pipe(
        mergeMap((items) => items),
        delay(200),
        concatMap((item) => this.mapToCraftingRow(item)),
      )
      .subscribe((data) => {
        this.dataSource.data = [...this.dataSource.data, data];
      });
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
    const costs$ = this.getIngredientCosts(item);
    const itemName$ = this.xivApiService.getName(item.id);
    const itemData$ = this.universalisService
      .getAllItemsFor(this.homeworld, item.id, 20)
      .pipe(delay(200));

    return combineLatest([itemName$, costs$, itemData$]).pipe(
      map(([name, cost, response]) => {
        const totalCost = cost.reduce(
          (acc, ingredient) => acc + ingredient.cost * ingredient.amount,
          0,
        );
        return {
          id: item.id,
          name: name.name,
          cost: totalCost,
          minPriceNq: response.minPriceNQ,
          roiNq: (item.amount * response.minPriceNQ) / totalCost,
          velocityNq: response.nqSaleVelocity,
          minPriceHq: response.minPriceHQ,
          roiHq: (item.amount * response.minPriceHQ) / totalCost,
          velocityHq: response.hqSaleVelocity,
          recipe: cost,
        };
      }),
    );
  }

  private getIngredientCosts(item: CraftingItem): Observable<CraftingItem[]> {
    return forkJoin(
      item.ingredients.map((ingredient, index) =>
        of(ingredient).pipe(
          delay(index * 200),
          mergeMap(() => this.getIngredientData(ingredient)),
        ),
      ),
    );
  }

  private getIngredientData(item: CraftingItem): Observable<CraftingItem> {
    return forkJoin([
      this.xivApiService.getName(item.id),
      this.universalisService.getAllItemsFor(this.homeworld, item.id, 20),
    ]).pipe(
      map(([name, response]) => ({
        ...item,
        name: name.name,
        cost: Math.max(response.minPriceNQ, response.minPriceHQ),
      })),
    );
  }
}
