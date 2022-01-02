import { Injectable } from '@angular/core';
import { Constants } from '../models/Constants';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  homeworld: string = Constants.DEFAULT_HOMEWORLD

  constructor() {}
}
