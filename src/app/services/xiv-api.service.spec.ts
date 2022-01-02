import { TestBed } from '@angular/core/testing';

import { XivAPIService } from './xiv-api.service';

describe('XivAPIService', () => {
  let service: XivAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XivAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
