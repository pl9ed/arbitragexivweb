import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Constants } from 'src/app/models/Constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  links = [
    "Arbitrage",
    "Gemstones"
  ]
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  homeworldBtnDefaultText = "Select Home World"
  homeworldSelection = Constants.PRIMAL
  homeworldBtnText = this.homeworldBtnDefaultText

  constructor(private settings: SettingsService) { }

  ngOnInit(): void {
  }

  setHomeworld(world: string) {
    this.homeworldBtnText = world
    this.settings.homeworld = world
  }

}
