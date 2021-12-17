import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/Constants';
import { GemstoneItemPrice } from 'src/app/models/GemstoneItemPrice';
import { UniversalisService } from 'src/app/services/universalis.service';

@Component({
  selector: 'app-gemstone',
  templateUrl: './gemstone.component.html',
  styleUrls: ['./gemstone.component.css']
})
export class GemstoneComponent implements OnInit {

  gemstoneHeaders = [
    'Item',
    'ID',
    'Unit Price (NQ)',
    'Price (NQ)',
    'Velocity (NQ)',
    // "Price (HQ)",
    // "Velocity (HQ)",
    'Region',
  ];
  gemstoneItems: GemstoneItemPrice[] = [];

  constructor(private router: Router, private mbAPI: UniversalisService) { }

  ngOnInit(): void {
  }

  getGemstoneData(world: string = Constants.DEFAULT_HOMEWORLD): void {
    Constants.GEMSTONE_ITEMS_LVL1.forEach((item, i) => {
      setTimeout(() => {
        this.mbAPI.getItem(world, item.id).then((response) => {
          let itemInfo = new GemstoneItemPrice(
            item.name,
            item.id,
            response.minPriceNQ,
            response.nqSaleVelocity,
            item.area,
            response.minPriceNQ / item.cost
          );
          this.gemstoneItems[i] = itemInfo;
        });
      }, 500 * i);
    });
  }

}
