import { TestBed } from '@angular/core/testing';

import { HuraceDataApiService } from './hurace-data-api.service';

describe('HuraceApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HuraceDataApiService = TestBed.get(HuraceDataApiService);
    expect(service).toBeTruthy();
  });
});
