import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/Constants';
import { Item } from 'src/app/models/Item';
import { SettingsService } from 'src/app/services/settings.service';
import { UniversalisService } from 'src/app/services/universalis.service';

@Component({
  selector: 'app-pricecheck',
  templateUrl: './pricecheck.component.html',
  styleUrls: ['./pricecheck.component.css']
})
export class PricecheckComponent implements OnInit {

  static itemKey = 'PRICE_CHECK_ITEM'

  items: Item[] = []
  pricesNQ: number[] = []
  pricesHQ: number[] = []

  headers = [
    "Item",
    "Price (NQ)",
    "Price (HQ)"
  ]

  constructor(private router: Router, private mbAPI: UniversalisService, private settings: SettingsService) { }

  ngOnInit(): void {
    const itemsString = localStorage.getItem(PricecheckComponent.itemKey)
    try {
      let itemArr = JSON.parse(itemsString!)
      if (itemArr.length > 0) {
        this.items = itemArr
      }
    } catch (e) {
      console.log(e)
    }

    this.populatePrices()
  }

  addItem(name: string, idString: string) {
    const id: number = Number(idString)
    if (name && id) {
      const item: Item = { name, id }
      this.items.push(item)
      localStorage.setItem(PricecheckComponent.itemKey, JSON.stringify(this.items))
      console.log(this.items)
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1)
  }

  loadDefaults() {
    this.items = Constants.DEFAULT_PRICECHECK_ITEMS
    localStorage.setItem(PricecheckComponent.itemKey, JSON.stringify(this.items))
  }

  clearItems() {
    this.items = []
    localStorage.setItem(PricecheckComponent.itemKey, JSON.stringify(this.items))
  }

  async populatePrices() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i]
      let prices = await this.mbAPI.getItem(this.settings.homeworld, item.id)
      this.pricesNQ[i] = prices.minPriceNQ
      this.pricesHQ[i] = prices.minPriceHQ
      await this.mbAPI.sleep(500)
    }
  }

}
