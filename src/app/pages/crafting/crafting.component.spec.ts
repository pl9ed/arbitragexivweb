import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { UniversalisService } from 'src/app/services/universalis.service';
import { XivAPIService } from 'src/app/services/xiv-api.service';
import { CraftingComponent } from './crafting.component';
import { SettingsConfig } from 'src/app/services/settings.models';
import { Item } from 'src/app/models/Item';
import { CraftingItem } from 'src/app/models/Crafting';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Crafting Component', () => {
  let component: CraftingComponent;
  let fixture: ComponentFixture<CraftingComponent>;
  let settingsService: jasmine.SpyObj<SettingsService>;
  let universalisService: jasmine.SpyObj<UniversalisService>;
  let xivApiService: jasmine.SpyObj<XivAPIService>;
  let liveAnnouncer: jasmine.SpyObj<LiveAnnouncer>;

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
    crafting: {
      items: [],
    },
  };

  beforeEach(async () => {
    const universalisSpy = jasmine.createSpyObj('UniversalisService', [
      'getAllItemsFor',
    ]);
    const xivApiSpy = jasmine.createSpyObj('XivAPIService', ['getName']);
    const liveAnnouncerSpy = jasmine.createSpyObj('LiveAnnouncer', [
      'announce',
    ]);

    await TestBed.configureTestingModule({
      imports: [MatSortModule, MatTableModule],
      declarations: [CraftingComponent],
      providers: [
        { provide: UniversalisService, useValue: universalisSpy },
        { provide: XivAPIService, useValue: xivApiSpy },
        { provide: LiveAnnouncer, useValue: liveAnnouncerSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CraftingComponent);
    component = fixture.componentInstance;
    settingsService = TestBed.inject(
      SettingsService,
    ) as jasmine.SpyObj<SettingsService>;
    universalisService = TestBed.inject(
      UniversalisService,
    ) as jasmine.SpyObj<UniversalisService>;
    xivApiService = TestBed.inject(
      XivAPIService,
    ) as jasmine.SpyObj<XivAPIService>;
    liveAnnouncer = TestBed.inject(
      LiveAnnouncer,
    ) as jasmine.SpyObj<LiveAnnouncer>;

    settingsService.settingsConfig$ = of(mockConfig);
    universalisService.getAllItemsFor.and.returnValue(
      of({
        itemID: 1,
        listings: [],
        minPriceNQ: 1,
        minPriceHQ: 1,
        nqSaleVelocity: 1,
        hqSaleVelocity: 1,
        unitsForSale: 1,
      }),
    );
    xivApiService.getName.and.returnValue(
      Promise.resolve({ id: 1, name: 'Test Item' } as Item),
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource correctly', () => {
    component.ngOnInit();
    expect(component.dataSource.data.length).toBe(0);
  });

  it('should announce sort change', () => {
    const sortState: Sort = {
      active: 'name',
      direction: 'asc' as SortDirection,
    };
    component.announceSortChange(sortState);
    expect(liveAnnouncer.announce).toHaveBeenCalledWith('Sorted ascending');
  });

  it('should map items to crafting rows correctly', waitForAsync(() => {
    const item: CraftingItem = {
      id: 1,
      name: 'Test Item',
      ingredients: [],
      amount: 1,
      cost: 100,
    };
    component['mapToCraftingRow'](item).subscribe((row) => {
      console.log(row);
      expect(row).toBe({
        id: item.id,
        name: 'Test Item',
        cost: 100,
        minPriceNq: 1,
        roiNq: 1 / 100,
        velocityNq: 1,
        minPriceHq: 1,
        roiHq: 1 / 100,
        velocityHq: 1,
        recipe: [],
      });
    });
  }));
});
