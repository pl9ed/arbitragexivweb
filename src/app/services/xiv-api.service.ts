import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XivAPIService {

  BASE_URL = "https://xivapi.com"

  constructor(private http: HttpClient) { }

  async getName(id: number): Promise<ItemName> {
    const url = `${this.BASE_URL}/item/${id}`
    return firstValueFrom(this.http.get<ItemName>(url))
  }

  async getNames(ids: number[]): Promise<Item[]> {
    const retArr: Item[] = []
    for(let i = 0; i < ids.length; i++) {
      const id = ids[i]
      const name = (await this.getName(id)).Name;
      retArr.push({ name, id });
    }
    return retArr
  }
}

interface ItemName {
  Name: string
}