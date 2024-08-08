import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsService } from 'src/app/services/settings.service';
import { DropdownOptions, ItemRow } from './flip.models';
import { Store } from '@ngrx/store';
import { clearData, loadPrices, setCategory } from './flip.actions';
import { selectCategory, selectItemRows } from './flip.selectors';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { formatDecimal, emptyIfInvalid } from '../../utils/number-utils';

@Component({
  selector: 'app-flip',
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.css'],
})
export class FlipComponent implements OnInit, OnDestroy {
  format = formatDecimal;
  emptyIfInvalid = emptyIfInvalid;

  selectedIndex: number = 0;
  dropdownTextOptions: DropdownOptions[] = [
    { property: 'consumables', display: 'Raid Consumables' },
    { property: 'craftingMats', display: 'Crafting Mats' },
    { property: 'craftingGear', display: 'Crafting Gear' },
    { property: 'materia', display: 'Materia' },
  ];

  headers = [
    'name',
    'roiNq',
    'minPriceNq',
    'homePriceNq',
    'worldNq',
    'velocityNq',
    'roiHq',
    'minPriceHq',
    'homePriceHq',
    'worldHq',
    'velocityHq',
  ];

  selectedCategory$!: Observable<string>;
  selectedItems$!: Observable<number[]>;
  rowData$!: Observable<ItemRow[]>;
  dataSource = new MatTableDataSource<ItemRow>([]);

  @ViewChild(MatSort) sort!: MatSort;

  private destroy$ = new Subject<void>();

  constructor(
    private settings: SettingsService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.selectedCategory$ = this.store.select(selectCategory);

    this.selectedItems$ = this.settings.settingsConfig$.pipe(
      map((config) => config.flip.itemLists.consumables),
    );

    this.selectedItems$.pipe(takeUntil(this.destroy$)).subscribe((items) => {
      items.forEach((item) => {
        this.store.dispatch(loadPrices({ itemId: item }));
      });
    });

    this.rowData$ = this.store.select(selectItemRows);
    this.rowData$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  togglePrices(index: number): void {
    this.selectedIndex = index;
    this.store.dispatch(
      setCategory({ category: this.dropdownTextOptions[index].property }),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearData());
    this.destroy$.next();
    this.destroy$.complete();
  }
}
