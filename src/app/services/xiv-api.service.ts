import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  
}

interface ItemName {
  Name: string
}