import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GemstoneComponent } from './pages/gemstone/gemstone.component';
import { FlipComponent } from './pages/flip/flip.component';

const routes: Routes = [
  { path: 'gemstone', component: GemstoneComponent},
  { path: '**', component: FlipComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
