import { TestBed } from '@angular/core/testing';
import { UniversalisService } from './universalis.service';
import { HttpClientModule } from '@angular/common/http'
import { HttpClient } from '@angular/common/http';

fdescribe('UniversalisService', () => {
  let service: UniversalisService;
  let client: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UniversalisService
      ]
    });
    service = TestBed.inject(UniversalisService);
    client = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
