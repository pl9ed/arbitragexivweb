import { Injectable } from '@angular/core';
import { Constants } from '../models/Constants';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  homeworld: string = Constants.DEFAULT_HOMEWORLD
  items: Item[] = []

  constructor() { }
}
