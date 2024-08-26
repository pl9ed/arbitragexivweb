import { Component, OnInit } from '@angular/core';
import { map, mergeMap, Observable, switchMap, toArray } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { UniversalisService } from '../../services/universalis.service';
import { CraftingItem, CraftingRow } from 'src/app/models/Crafting';

@Component({
  selector: 'app-crafting',
  standalone: true,
  imports: [],
  templateUrl: './crafting.component.html',
  styleUrl: './crafting.component.css'
})
export class CraftingComponent implements OnInit {

  homeworld: string
  items$: Observable<CraftingItem[]>
  row$: Observable<CraftingRow[]> | undefined

  constructor(private settings: SettingsService, private universalisService: UniversalisService) {
    this.items$ = this.settings.settingsConfig$.pipe(map(config => config.crafting.items))
    this.homeworld = this.settings.homeworld
  }

  ngOnInit() {
    this.row$ = this.items$.pipe(
      mergeMap(items => items),
      switchMap(item => this.createRow(item)),
      toArray()
    );
  }

  private createRow(item: CraftingItem): Observable<CraftingRow> {
    return this.universalisService.getAllItemsFor(this.homeworld, item.id, 20).pipe(
      map(response => {
        // stub
        return {} as CraftingRow
      })
    )
  }
}
