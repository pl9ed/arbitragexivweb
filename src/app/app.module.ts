import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlipComponent } from './pages/flip/flip.component';
import { GemstoneComponent } from './pages/gemstone/gemstone.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { HomeComponent } from './pages/home/home.component';
import { PricecheckComponent } from './pages/pricecheck/pricecheck.component';


@NgModule({
  declarations: [
    AppComponent,
    FlipComponent,
    GemstoneComponent,
    NavbarComponent,
    HomeComponent,
    PricecheckComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
