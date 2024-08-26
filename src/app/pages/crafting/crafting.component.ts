import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-crafting',
  standalone: true,
  imports: [],
  templateUrl: './crafting.component.html',
  styleUrl: './crafting.component.css'
})
export class CraftingComponent implements OnInit {

  constructor(private settings: SettingsService, private store: Store) {}

  ngOnInit() {

  }

}
