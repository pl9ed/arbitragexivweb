import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { SettingsService } from 'src/app/services/settings.service';
import { Constants } from 'src/app/models/Constants';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let settingsService: SettingsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        {
          provide: SettingsService,
          useValue: {
            homeworld: Constants.DEFAULT_HOMEWORLD,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    settingsService = TestBed.inject(SettingsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default links', () => {
    expect(component.links).toEqual(['Arbitrage', 'Gemstones']);
  });

  it('should set the active link to the first link by default', () => {
    expect(component.activeLink).toBe('Arbitrage');
  });

  it('should have default homeworld button text', () => {
    expect(component.homeworldBtnText).toBe(Constants.DEFAULT_HOMEWORLD);
  });

  it('should set homeworld button text when setHomeworld is called', () => {
    const newWorld = 'New World';
    component.setHomeworld(newWorld);
    expect(component.homeworldBtnText).toBe(newWorld);
    expect(settingsService.homeworld).toBe(newWorld);
  });
});
