import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { mergeMap, Observable } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { checkGemstonePrice } from './gemstone.actions';
import { GemstoneItemPrice } from './gemstone.models';

@Component({
  selector: 'app-gemstone',
  templateUrl: './gemstone.component.html',
  styleUrls: ['./gemstone.component.css'],
})
export class GemstoneComponent implements OnInit {
  gemstoneHeaders = [
    'Item',
    'ID',
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
  }
}
