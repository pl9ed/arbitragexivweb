import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, mergeMap, Observable, of, tap } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { checkGemstonePrice, clearData } from './gemstone.actions';
import { GemstoneItemPrice } from './gemstone.models';
import { selectGemstonePrices } from './gemstone.selectors';
import { XivAPIService } from '../../services/xiv-api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gemstone',
  templateUrl: './gemstone.component.html',
  styleUrls: ['./gemstone.component.css'],
})
export class GemstoneComponent implements OnInit, OnDestroy, AfterViewInit {
  gemstoneHeaders = [
    'name',
    'unitCost',
    'minPriceNQ',
    'velocityNQ',
    'minPriceHQ',
    'velocityHQ',
    'areaName',
  ];
  gemstonePrices$!: Observable<GemstoneItemPrice[]>;
  dataSource = new MatTableDataSource<GemstoneItemPrice>([]);
  displayedColumns: string[] = this.gemstoneHeaders;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private settings: SettingsService,
    private store: Store,
    private xivApiService: XivAPIService,
  ) {}

  ngOnInit(): void {
    this.settings.settingsConfig$
      .pipe(
        mergeMap((config) => config.gemstoneItems),
        mergeMap((item) => {
          if (item.id && item.id > 0) {
            return of(item); // Wrap the item in an observable
          } else {
            console.log(`No id for ${item.name}, searching`);
            return this.xivApiService.findFirstByName(item.name).pipe(
              tap((id) => {
                item.id = id;
                console.log(`Mapping id ${id} to ${item.name}`);
              }),
              map(() => item), // Return the modified item
            );
          }
        }),
      )
      .subscribe((item) => {
        this.store.dispatch(checkGemstonePrice({ item }));
      });

    this.gemstonePrices$ = this.store.select(selectGemstonePrices);
    this.gemstonePrices$.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    // teardown subscriptions
    // cache lookups? or maybe better to just update to get most recent prices
    this.store.dispatch(clearData());
  }
}
