import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GemstoneComponent } from './pages/gemstone/gemstone.component';
import { FlipComponent } from './pages/flip/flip.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'flip', component: FlipComponent },
  { path: 'gemstone', component: GemstoneComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
