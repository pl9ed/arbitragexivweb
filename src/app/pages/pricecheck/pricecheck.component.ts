import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private mbAPI: UniversalisService, private settings: SettingsService) { }

  ngOnInit(): void {
    const items = localStorage.getItem(PricecheckComponent.itemKey)
    console.log(items)
    if (items) {
      try {
        this.items = JSON.parse(items)
      } catch (e) {
        console.log(e)
      }
    }
  }

  addItem(name: string, id: number) {
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

  clearItems() {
    this.items = []
    localStorage.setItem(PricecheckComponent.itemKey, JSON.stringify(this.items))
  }

}
