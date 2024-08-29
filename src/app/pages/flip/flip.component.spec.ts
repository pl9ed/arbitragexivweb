import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlipComponent } from './flip.component';
import { SettingsService } from 'src/app/services/settings.service';
import { firstValueFrom, of } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ItemRow } from './flip.models';
import { clearData, loadPrices, setCategory } from './flip.actions';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectCategory, selectItemRows } from './flip.selectors';
import { SettingsConfig } from 'src/app/services/settings.models';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FlipComponent', () => {
  let component: FlipComponent;
  let fixture: ComponentFixture<FlipComponent>;
  let mockSettingsService: jasmine.SpyObj<SettingsService>;
  let mockStore: MockStore;

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
    mockSettingsService = jasmine.createSpyObj('SettingsService', [
      'settingsConfig$',
    ]);

    await TestBed.configureTestingModule({
      declarations: [FlipComponent],
      providers: [
        { provide: SettingsService, useValue: mockSettingsService },
        provideMockStore({
          selectors: [
            { selector: selectCategory, value: 'consumables' },
            {
              selector: selectItemRows,
              value: [{ name: 'item1' }, { name: 'item2' }] as ItemRow[],
            },
          ],
        }),
      ],
      imports: [MatSortModule, MatTableModule, BrowserAnimationsModule],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipComponent);
    component = fixture.componentInstance;
    mockSettingsService.settingsConfig$ = of(mockConfig);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data on ngOnInit', async () => {
    const expectedCategory = 'consumables';
    const expectedItems = [1, 2, 3];
    const selectSpy = spyOn(mockStore, 'select').and.callFake((selector) => {
      if (selector === selectCategory) {
        return of(expectedCategory);
      } else if (selector === selectItemRows) {
        return of([{ name: 'item1' }, { name: 'item2' }] as ItemRow[]);
      }
      return of([]);
    });
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();

    component.ngOnInit();

    expect(selectSpy).toHaveBeenCalledWith(selectCategory);
    expectedItems.forEach((item) => {
      expect(dispatchSpy).toHaveBeenCalledWith(loadPrices({ itemId: item }));
    });
    expect(selectSpy).toHaveBeenCalledWith(selectItemRows);

    expect(await firstValueFrom(component.selectedCategory$)).toEqual(
      expectedCategory,
    );
    expect(await firstValueFrom(component.selectedItems$)).toEqual(
      expectedItems,
    );

    component.rowData$.subscribe((data) => console.log(data));

    expect(await firstValueFrom(component.rowData$)).toEqual([
      { name: 'item1' },
      { name: 'item2' },
    ] as ItemRow[]);
  });

  it('should dispatch setCategory on togglePrices', () => {
    const spy = spyOn(mockStore, 'dispatch').and.callThrough();
    const index = 1;
    component.togglePrices(index);
    expect(spy).toHaveBeenCalledWith(
      setCategory({ category: component.dropdownTextOptions[index].property }),
    );
  });

  it('should clean up on ngOnDestroy', () => {
    spyOn(component.destroy$, 'next');
    spyOn(component.destroy$, 'complete');

    component.ngOnDestroy();

    mockStore.scannedActions$.subscribe((action) => {
      expect(action).toEqual(clearData());
    });

    expect(component.destroy$.next).toHaveBeenCalled();
    expect(component.destroy$.complete).toHaveBeenCalled();
  });
});
