import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root',
})
export class XivAPIService {
  BASE_URL = 'https://xivapi.com';

  constructor(private http: HttpClient) {}

  async getName(id: number): Promise<Item> {
    const url = `${this.BASE_URL}/item/${id}`;
    const result = await firstValueFrom(this.http.get<SearchResult>(url));
    return { id: result.ID, name: result.Name } as Item;
  }

  async getNames(ids: number[]): Promise<Item[]> {
    const retArr: Item[] = [];
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const name = (await this.getName(id)).name;
      retArr.push({ id, name });
    }
    return retArr;
  }

  search(term: string): Observable<PaginatedResult<SearchResult>> {
    return this.http.get<PaginatedResult<SearchResult>>(
      `${this.BASE_URL}/search?string=${term}`,
    );
  }

  findFirstByName(name: string): Observable<number> {
    return this.http
      .get<
        PaginatedResult<SearchResult>
      >(this.BASE_URL + '/search?string=' + name)
      .pipe(map((response) => response.Results[0].ID));
  }
}

interface SearchResult {
  ID: number;
  Name: string;
}

interface PaginatedResult<T> {
  Results: T[];
}
