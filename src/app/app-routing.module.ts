import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GemstoneComponent } from './pages/gemstone/gemstone.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'gemstone', component: GemstoneComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
