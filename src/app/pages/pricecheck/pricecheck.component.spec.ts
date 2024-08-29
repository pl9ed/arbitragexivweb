import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PricecheckComponent } from './pricecheck.component';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UniversalisService } from 'src/app/services/universalis.service';
import { SettingsService } from 'src/app/services/settings.service';
import { XivAPIService } from 'src/app/services/xiv-api.service';
import { of } from 'rxjs';

describe('PricecheckComponent', () => {
  let component: PricecheckComponent;
  let fixture: ComponentFixture<PricecheckComponent>;
  let universalisServiceMock: any;
  let settingsServiceMock: any;
  let xivAPIServiceMock: any;
  let liveAnnouncerMock: any;

  beforeEach(async () => {
    universalisServiceMock = jasmine.createSpyObj('UniversalisService', [
      'getAllItemsFor',
    ]);
    settingsServiceMock = jasmine.createSpyObj('SettingsService', [
      'settingsConfig$',
    ]);
    xivAPIServiceMock = jasmine.createSpyObj('XivAPIService', [
      'getName',
      'getNames',
    ]);
    liveAnnouncerMock = jasmine.createSpyObj('LiveAnnouncer', ['announce']);

    await TestBed.configureTestingModule({
      declarations: [PricecheckComponent],
      providers: [
        { provide: UniversalisService, useValue: universalisServiceMock },
        { provide: SettingsService, useValue: settingsServiceMock },
        { provide: XivAPIService, useValue: xivAPIServiceMock },
        { provide: LiveAnnouncer, useValue: liveAnnouncerMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricecheckComponent);
    component = fixture.componentInstance;
    component.sort = new MatSort();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with items from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify([{ name: 'Test Item', id: 1 }]),
    );
    spyOn(component, 'populatePrices');
    component.ngOnInit();
    expect(component.items.length).toBe(1);
    expect(component.populatePrices).toHaveBeenCalled();
  });

  it('should add item correctly', async () => {
    const mockItem = { name: 'Test Item', id: 1 };
    xivAPIServiceMock.getName.and.returnValue(Promise.resolve(mockItem));
    universalisServiceMock.getAllItemsFor.and.returnValue(
      of({
        minPriceNQ: 100,
        nqSaleVelocity: 2,
        minPriceHQ: 200,
        hqSaleVelocity: 1,
      }),
    );

    await component.addItem('1');
    expect(component.items.length).toBe(1);
    expect(component.dataSource.data.length).toBe(1);
  });

  it('should remove item correctly', () => {
    component.dataSource.data = [
      {
        name: 'Test Item',
        priceNq: 100,
        velocityNq: 2,
        priceHq: 200,
        velocityHq: 1,
      },
    ];
    component.removeItem(0);
    expect(component.dataSource.data.length).toBe(0);
  });

  it('should clear items correctly', () => {
    component.items = [{ name: 'Test Item', id: 1 }];
    component.dataSource.data = [
      {
        name: 'Test Item',
        priceNq: 100,
        velocityNq: 2,
        priceHq: 200,
        velocityHq: 1,
      },
    ];
    component.clearItems();
    expect(component.items.length).toBe(0);
    expect(component.dataSource.data.length).toBe(0);
  });

  it('should announce sort change correctly', () => {
    component.announceSortChange({ active: 'name', direction: 'asc' });
    expect(liveAnnouncerMock.announce).toHaveBeenCalledWith('Sorted ascending');
  });

  it('should remove item correctly by name', () => {
    // Arrange
    const testItem1 = { name: 'Test Item 1', id: 1 };
    const testItem2 = { name: 'Test Item 2', id: 2 };
    component.items = [testItem1, testItem2];
    component.dataSource.data = [
      {
        name: 'Test Item 1',
        priceNq: 100,
        velocityNq: 2,
        priceHq: 200,
        velocityHq: 1,
      },
      {
        name: 'Test Item 2',
        priceNq: 150,
        velocityNq: 3,
        priceHq: 250,
        velocityHq: 2,
      },
    ];
    spyOn(localStorage, 'setItem');

    // Act
    component.remove('Test Item 1');

    // Assert
    expect(component.items.length).toBe(1);
    expect(component.items[0].name).toBe('Test Item 2');
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].name).toBe('Test Item 2');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      PricecheckComponent.itemKey,
      JSON.stringify([testItem2]),
    );
  });
});
