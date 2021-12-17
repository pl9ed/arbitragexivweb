import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/Constants';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeworldBtnDefaultText = "Select Home World"
  homeworldSelection = Constants.PRIMAL
  homeworldBtnText = this.homeworldBtnDefaultText

  constructor(private router: Router, private settings: SettingsService) { }

  ngOnInit(): void {
  }

  setHomeworld(world: string) {
    this.homeworldBtnText = world
    this.settings.homeworld = world
  }

}
