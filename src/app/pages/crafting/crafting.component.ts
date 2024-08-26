import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest, delay, forkJoin, map, mergeMap, Observable, switchMap, toArray } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { UniversalisService } from '../../services/universalis.service';
import { CraftingItem, CraftingRow } from 'src/app/models/Crafting';
import { XivAPIService } from 'src/app/services/xiv-api.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrl: './crafting.component.css'
})
export class CraftingComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'name',
    'costNq',
    'minPriceNq',
    'roiNq',
    'velocityNq',
    'costHq',
    'minPriceHq',
    'roiHq',
    'velocityHq'
  ];

  homeworld: string
  items$: Observable<CraftingItem[]>
  row$: Observable<CraftingRow[]>

  dataSource = new MatTableDataSource<CraftingRow>([]);
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private settings: SettingsService, 
    private universalisService: UniversalisService,
    private xivApiService: XivAPIService,
    private liveAnnouncer: LiveAnnouncer
  ) {
    this.items$ = this.settings.settingsConfig$.pipe(map(config => config.crafting.items))
    this.homeworld = this.settings.homeworld
  }

  ngOnInit() {
    this.row$ = this.items$.pipe(
      mergeMap(items => items),
      delay(200),
      switchMap(item => this.mapToCraftingRow(item)),
      toArray()
    );
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
    const costs$ = item.ingredients.map(ingredient => {
      return this.universalisService.getAllItemsFor(this.homeworld, ingredient.id, 20).pipe(
        map(response => {
          return {
            nqCost: response.minPriceNQ * ingredient.amount,
            hqCost: response.minPriceHQ * ingredient.amount
          }
        }
      ))
    });

    const costTotal$ = forkJoin(costs$).pipe(
      map(prices => {
        const totalNqCost = prices.reduce((sum, price) => sum + price.nqCost, 0);
        const totalHqCost = prices.reduce((sum, price) => sum + price.hqCost, 0);
        return { totalNqCost, totalHqCost };
      })
    );

    const itemName$ = this.xivApiService.getName(item.id)

    return combineLatest([itemName$, costTotal$, this.universalisService.getAllItemsFor(this.homeworld, item.id, 20)]).pipe(
      map(([name, cost, response]) => {
        // stub
        return {
          id: item.id,
          name: name.name,
          costNq: cost.totalNqCost,
          minPriceNq: response.minPriceNQ,
          roiNq: (item.amount * response.minPriceNQ) / cost.totalNqCost,
          velocityNq: response.nqSaleVelocity,
          costHq: cost.totalHqCost,
          minPriceHq: response.minPriceHQ,
          roiHq: (item.amount * response.minPriceHQ) / cost.totalHqCost,
          velocityHq: response.hqSaleVelocity,
          recipe: [] // stub
        }
      })
    )
  }
}
