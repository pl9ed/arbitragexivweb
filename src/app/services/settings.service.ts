import { Injectable } from '@angular/core';
import { Constants } from '../models/Constants';
import * as yaml from 'yaml';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  homeworld: string = Constants.DEFAULT_HOMEWORLD;

  config$: Observable<SettingsConfig>;

  constructor(private http: HttpClient) {
    this.config$ = this.http
      .get('assets/config.yml', { responseType: 'text' })
      .pipe(map((str) => yaml.parse(str)));
  }
}

interface SettingsConfig {
  defaultWorld: string;
  flip: {
    dropDownOptions: string[];
    itemLists: {
      consumables: number[];
      craftingGear: number[];
      craftingMats: number[];
      materia: number[];
    };
  };
  primal: string[];
}
