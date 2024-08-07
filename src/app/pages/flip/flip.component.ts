/* eslint-disable prettier/prettier */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { DropdownOptions, ItemRow } from './flip.models';
import { Store } from '@ngrx/store';
import { clearData, loadPrices, setCategory } from './flip.actions';
import { selectCategory, selectItemRows } from './flip.selectors';

@Component({
  selector: 'app-flip',
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.css'],
})
export class FlipComponent implements OnInit, OnDestroy {
  selectedIndex: number = 0;
  dropdownTextOptions: DropdownOptions[] = [
    { property: "consumables", display: 'Raid Consumables' },
    { property: 'craftingMats', display: 'Crafting Mats'},
    { property: 'craftingGear', display: 'Crafting Gear' },
    { property: 'materia', display: 'Materia' },
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

  selectedCategory$!: Observable<string>
  selectedItems$!: Observable<number[]>;

  rowData$!: Observable<readonly ItemRow[]>

  constructor(
    private router: Router,
    private settings: SettingsService,
    private store: Store
  ) {}

  ngOnInit() {
    this.selectedCategory$ = this.store.select(selectCategory)

    this.selectedItems$ = this.settings.settingsConfig$.pipe(map(config => config.flip.itemLists.consumables))
    this.selectedItems$.subscribe(items => {
      items.forEach(item => {
        this.store.dispatch(loadPrices({ itemId: item}))
      })
    })

    this.rowData$ = this.store.select(selectItemRows)
  }

  togglePrices(index: number) {
    this.selectedIndex = index;
    this.store.dispatch(setCategory({ category: this.dropdownTextOptions[index].property}))
  }

  format(num: number | null) {
    if (num) return num.toFixed(2)
    return "n/a"
  }

  emptyIfInvalid(num: number) {
    if (Number.isNaN(num) || !Number.isFinite(num)) {
      return null
    } else {
      return num
    }
  }

  ngOnDestroy(): void {
      this.store.dispatch(clearData())
  }
}
