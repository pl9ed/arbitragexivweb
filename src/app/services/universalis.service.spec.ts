import { TestBed } from '@angular/core/testing';
import { UniversalisService } from './universalis.service';
import { HttpClientModule } from '@angular/common/http'

fdescribe('UniversalisService', () => {
  let service: UniversalisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UniversalisService
      ]
    });
    service = TestBed.inject(UniversalisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
