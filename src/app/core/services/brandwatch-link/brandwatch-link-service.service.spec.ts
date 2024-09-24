import { TestBed } from '@angular/core/testing';

import { BrandwatchLinkServiceService } from './brandwatch-link-service.service';

describe('BrandwatchLinkServiceService', () => {
  let service: BrandwatchLinkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandwatchLinkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
