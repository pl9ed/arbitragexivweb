import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class XivAPIService {

  BASE_URL = "https://xivapi.com"

  constructor(private http: HttpClient) { }

  async getName(id: number): Promise<ItemName> {
    const url = `${this.BASE_URL}/item/${id}`
    return this.http.get<ItemName>(url).toPromise()
  }

  async getNames(ids: number[]): Promise<Item[]> {
    var retArr: Item[] = []
    ids.forEach(async (id) => {
      const name = (await this.getName(id)).Name;
      retArr.push({ name, id });
    })
    return retArr
  }

}

interface ItemName {
  Name: string
}