import { TestBed } from '@angular/core/testing';
import { UniversalisService } from './universalis.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('UniversalisService', () => {
  let service: UniversalisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        UniversalisService,
        provideHttpClient(withInterceptorsFromDi()),
      ],
    });
    service = TestBed.inject(UniversalisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
