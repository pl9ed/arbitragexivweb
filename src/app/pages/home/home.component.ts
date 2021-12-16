import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/Constants';
import { ItemResponse } from 'src/app/models/ItemResponse';
import { ComparisonService } from 'src/app/services/comparison.service';

export interface ItemRow {
  item: string,
  nqROI: number,
  nqMinPrice: number,
  nqHomePrice: number,
  nqMinPriceWorld: string,
  nqVelocity: number,
  hqROI: number,
  hqMinPrice: number,
  hqHomePrice: number,
  hqMinPriceWorld: string,
  hqVelocity: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  testString = "My test string!"
  headers = [
    "Item",
    "ROI (NQ)",
    "Min Price (NQ)",
    "Home Price (NQ)",
    "Min Price World (NQ)",
    "Velocity (NQ)",
    "ROI (HQ)",
    "Min Price (HQ)",
    "Home Price (HQ)",
    "Min Price World (HQ)",
    "Velocity (HQ)",
  ]
  items: number[] = []

  constructor(
    private router: Router,
    private comparison: ComparisonService
  ) {

  }

  ngOnInit() {
    this.items = Constants.TEST_ITEM_IDS
    this.items.forEach((id, i) => {
      setTimeout(() => 
      this.getData(id)
      , 500 * i)
    })
  }

  getData(id: number): void {
      let nqMap = this.comparison.getNQPrices(id)
      let hqMap = this.comparison.getHQPrices(id)

    
  }

}
