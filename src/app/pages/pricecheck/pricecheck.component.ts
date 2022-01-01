import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { UniversalisService } from 'src/app/services/universalis.service';

@Component({
  selector: 'app-pricecheck',
  templateUrl: './pricecheck.component.html',
  styleUrls: ['./pricecheck.component.css']
})
export class PricecheckComponent implements OnInit {

  constructor(private router: Router, private mbAPI: UniversalisService, private settings: SettingsService) { }

  ngOnInit(): void {
  }

}
