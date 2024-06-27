/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Constants } from 'src/app/models/Constants';
import { SettingsService } from 'src/app/services/settings.service';
import { ItemRow } from './flip.models';
import { Store } from '@ngrx/store';
import { loadPrices, selectItems } from './flip.actions';
import { selectItemRows } from './flip.selectors';

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

  selectedItems$!: Observable<number[]>;

  rowData$!: Observable<readonly ItemRow[]>

  constructor(
    private router: Router,
    private settings: SettingsService,
    private store: Store
  ) {}

  ngOnInit() {
    this.selectedItems$ = this.settings.settingsConfig$.pipe(map(config => config.flip.itemLists.consumables))
    this.selectedItems$.subscribe(items => {
      items.forEach(item => {
        this.store.dispatch(loadPrices({ itemId: item}))
      })
    })

    this.rowData$ = this.store.select(selectItemRows)
  }

  togglePrices(index: number) {
    this.store.dispatch(selectItems({ items: this.toggleItems[index]}))
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
}
