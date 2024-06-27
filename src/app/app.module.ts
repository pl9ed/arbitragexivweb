import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
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
import { StoreModule } from '@ngrx/store';
import { settings } from './services/settings.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { FlipPriceEffects } from './pages/flip/flip.effects';
import { flipPrices } from './pages/flip/flip.reducers';

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
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ settings, flipPrices }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([FlipPriceEffects]),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
