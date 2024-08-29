import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GemstoneComponent } from './gemstone.component';
import { MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { XivAPIService } from '../../services/xiv-api.service';
import { selectGemstonePrices } from './gemstone.selectors';
import { checkGemstonePrice, clearData } from './gemstone.actions';
import { SettingsConfig } from '../../services/settings.models';

describe('GemstoneComponent', () => {
  let component: GemstoneComponent;
  let fixture: ComponentFixture<GemstoneComponent>;
  let mockSettingsService: any;
  let mockStore: any;
  let mockXivAPIService: any;

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
    mockSettingsService = {
      settingsConfig$: of(mockConfig),
    };
    mockStore = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine.createSpy('select').and.returnValue(of([])),
    };
    mockXivAPIService = {
      findFirstByName: jasmine
        .createSpy('findFirstByName')
        .and.returnValue(of(1)),
    };

    await TestBed.configureTestingModule({
      declarations: [GemstoneComponent],
      imports: [MatTableModule],
      providers: [
        { provide: SettingsService, useValue: mockSettingsService },
        { provide: Store, useValue: mockStore },
        { provide: XivAPIService, useValue: mockXivAPIService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GemstoneComponent);
    component = fixture.componentInstance;
    component.sort = new MatSort();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource and subscribe to gemstonePrices$', () => {
    component.ngOnInit();
    expect(mockStore.select).toHaveBeenCalledWith(selectGemstonePrices);
    expect(component.dataSource.data).toEqual([]);
  });

  it('should set dataSource sort after view init', () => {
    component.ngAfterViewInit();
    expect(component.dataSource.sort).toBe(component.sort);
  });

  it('should dispatch clearData on destroy', () => {
    component.ngOnDestroy();
    expect(mockStore.dispatch).toHaveBeenCalledWith(clearData());
  });

  it('should handle settingsConfig$ observable correctly', () => {
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      checkGemstonePrice({ item: mockConfig.gemstoneItems[0] }),
    );
  });
});
