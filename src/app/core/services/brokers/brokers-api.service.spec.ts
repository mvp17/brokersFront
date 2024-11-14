import { TestBed } from '@angular/core/testing';

import { BrokersApiService } from './brokers-api.service';

describe('BrokersApiService', () => {
  let service: BrokersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrokersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
