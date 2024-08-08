import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SettingsService } from './settings.service';
import { Constants } from '../models/Constants';
import { SettingsConfig } from './settings.models';
import * as yaml from 'yaml';
import { provideHttpClient } from '@angular/common/http';

describe('SettingsService', () => {
  let service: SettingsService;
  let httpMock: HttpTestingController;

  const mockConfig: SettingsConfig = {
    homeworld: 'homeworld',
    primal: ['primal1', 'primal2', 'primal3'],
    flip: {
      dropDownOptions: ['option1', 'option2', 'option3'],
      itemLists: {
        consumables: [1, 2, 3],
        craftingGear: [4, 5, 6],
        craftingMats: [7, 8, 9],
        materia: [10, 11, 12],
      },
    },
    gemstoneItems: [
      {
        name: 'gemstone',
        id: 123,
        area: 'area',
        cost: 2,
      },
    ],
    pricechecker: {
      default: [1, 2, 3, 4, 5],
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(SettingsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default homeworld', () => {
    expect(service.homeworld).toBe(Constants.DEFAULT_HOMEWORLD);
  });

  it('should fetch and parse settings config', (done) => {
    const mockYaml = yaml.stringify(mockConfig);

    service.settingsConfig$.subscribe((config: SettingsConfig) => {
      expect(config).toEqual(mockConfig);
      done();
    });

    const req = httpMock.expectOne('assets/config.yml');
    expect(req.request.method).toBe('GET');
    req.flush(mockYaml);
  });
});
