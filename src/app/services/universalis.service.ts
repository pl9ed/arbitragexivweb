import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversalisService {

  baseURL: string = "https://universalis.app"

  constructor(private http: HttpClient) { }

  async getItem(world: string, id: Number): Promise<ItemResponse> {
    let url = `${this.baseURL}/api/${world}/${id}`
    console.log(url)
    return this.http.get<ItemResponse>(url).toPromise()
  }
}
