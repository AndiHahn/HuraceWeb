import { TestBed } from '@angular/core/testing';

import { HuraceLiveApiService } from './hurace-live-api.service';

describe('HuraceLiveApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HuraceLiveApiService = TestBed.get(HuraceLiveApiService);
    expect(service).toBeTruthy();
  });
});
