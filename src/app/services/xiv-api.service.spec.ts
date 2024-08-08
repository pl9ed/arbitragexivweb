import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { XivAPIService } from './xiv-api.service';
import { Item } from '../models/Item';
import { provideHttpClient } from '@angular/common/http';

describe('XivAPIService', () => {
  let service: XivAPIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        XivAPIService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(XivAPIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch item name by id', async () => {
    const mockResult = { ID: 1, Name: 'Test Item' };
    const expectedItem: Item = { id: 1, name: 'Test Item' };

    service.getName(1).then((item) => {
      expect(item).toEqual(expectedItem);
    });

    const req = httpMock.expectOne('https://xivapi.com/item/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResult);
  });

  it('should fetch multiple item names by ids', fakeAsync(inject([XivAPIService], async () => {
    const mockResults = [
      { ID: 1, Name: 'Test Item 1' },
      { ID: 2, Name: 'Test Item 2' },
    ];
    const expectedItems: Item[] = [
      { id: 1, name: 'Test Item 1' },
      { id: 2, name: 'Test Item 2' },
    ];

    const promise = service.getNames([1, 2]);

    // Flush the requests in the order they are made
    mockResults.forEach((mockResult) => {
      const req = httpMock.expectOne((request) => {
        console.log('Request URL:', request.url);
        return request.url === `https://xivapi.com/item/${mockResult.ID}`;
      });
      expect(req.request.method).toBe('GET');
      req.flush(mockResult);
      tick(10000)
    });

    const items = await promise;
    expect(items).toEqual(expectedItems);
  })));

  it('should find first item by name', () => {
    const mockResult = { Results: [{ ID: 1, Name: 'Test Item' }] };

    service.findFirstByName('Test Item').subscribe((id) => {
      expect(id).toBe(1);
    });

    const req = httpMock.expectOne(
      'https://xivapi.com/search?string=Test Item',
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResult);
  });
});
