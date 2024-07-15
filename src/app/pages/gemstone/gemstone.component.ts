import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { mergeMap, Observable } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { checkGemstonePrice, clearData } from './gemstone.actions';
import { GemstoneItemPrice } from './gemstone.models';
import { selectGemstonePrices } from './gemstone.selectors';

@Component({
  selector: 'app-gemstone',
  templateUrl: './gemstone.component.html',
  styleUrls: ['./gemstone.component.css'],
})
export class GemstoneComponent implements OnInit, OnDestroy {
  gemstoneHeaders = [
    'Item',
    'Unit Price (NQ)',
    'Price (NQ)',
    'Velocity (NQ)',
    // "Price (HQ)",
    // "Velocity (HQ)",
    'Region',
  ];
  gemstonePrices$!: Observable<GemstoneItemPrice[]>;

  constructor(
    private router: Router,
    private settings: SettingsService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.settings.settingsConfig$
      .pipe(mergeMap((config) => config.gemstoneItems))
      .subscribe((item) => {
        this.store.dispatch(checkGemstonePrice({ item: item }));
      });

    this.gemstonePrices$ = this.store.select(selectGemstonePrices);
  }

  ngOnDestroy(): void {
    // teardown subscriptions
    // cache lookups? or maybe better to just update to get most recent prices
    this.store.dispatch(clearData());
  }
}
