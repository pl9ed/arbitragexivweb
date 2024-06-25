import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlipComponent } from './pages/flip/flip.component';
import { GemstoneComponent } from './pages/gemstone/gemstone.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
