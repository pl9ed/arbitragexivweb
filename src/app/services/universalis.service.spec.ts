import { TestBed } from '@angular/core/testing';
import { Constants } from '../models/Constants'
import { UniversalisService } from './universalis.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
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

  it('should make API calls', () => {
    service = new UniversalisService(client);
    Constants.TEST_ITEM_IDS.forEach( async function (id) {
      let item = await service.getItem(Constants.DEFAULT_HOMEWORLD, id);
      expect(item).toBeTruthy();
      console.log(item)
      expect(item.minPrice).toBeGreaterThan(0)
    })
  })
});
