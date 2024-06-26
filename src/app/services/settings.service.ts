import { Injectable } from '@angular/core';
import { Constants } from '../models/Constants';
import * as yaml from 'yaml';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SettingsConfig } from './settings.models';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  homeworld: string = Constants.DEFAULT_HOMEWORLD;

  settingsConfig$: Observable<SettingsConfig>;

  constructor(private http: HttpClient) {
    this.settingsConfig$ = this.http
      .get('assets/config.yml', { responseType: 'text' })
      .pipe(map((str) => yaml.parse(str)));
  }
}
