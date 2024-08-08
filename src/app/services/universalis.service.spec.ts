import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UniversalisService } from './universalis.service';
import { ItemResponse } from '../models/ItemResponse';
import { provideHttpClient } from '@angular/common/http';

describe('UniversalisService', () => {
  let service: UniversalisService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversalisService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(UniversalisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all items for given dataCenter, id, and listings', () => {
    const dummyResponse: ItemResponse = {
      itemID: 123,
      listings: [
        {
          pricePerUnit: 10,
          quantity: 5,
          worldName: 'world',
          hq: false
        },
        {
          pricePerUnit: 10,
          quantity: 5,
          worldName: 'world',
          hq: true
        }
      ],
      minPriceNQ: 5,
      minPriceHQ: 10,
      nqSaleVelocity: 1,
      hqSaleVelocity: 2,
      unitsForSale: 100
    };
    const dataCenter = 'Aether';
    const id = 12345;
    const listings = 10;

    service.getAllItemsFor(dataCenter, id, listings).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/api/v2/${dataCenter}/${id}?listings=${listings}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should resolve after the specified time in sleep method', async () => {
    const timer = 1000;
    const start = Date.now();

    await service.sleep(timer);

    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(timer);
  });
});