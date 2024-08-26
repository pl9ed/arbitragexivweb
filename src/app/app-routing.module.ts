import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GemstoneComponent } from './pages/gemstone/gemstone.component';
import { FlipComponent } from './pages/flip/flip.component';
import { HomeComponent } from './pages/home/home.component';
import { PricecheckComponent } from './pages/pricecheck/pricecheck.component';
import { CraftingComponent } from './pages/crafting/crafting.component';

const routes: Routes = [
  { path: 'flip', component: FlipComponent },
  { path: 'gemstone', component: GemstoneComponent },
  { path: 'prices', component: PricecheckComponent },
  { path: 'crafting', component: CraftingComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
