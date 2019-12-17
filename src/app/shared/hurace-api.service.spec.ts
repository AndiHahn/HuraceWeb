import { TestBed } from '@angular/core/testing';

import { HuraceApiService } from './hurace-api.service';

describe('HuraceApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HuraceApiService = TestBed.get(HuraceApiService);
    expect(service).toBeTruthy();
  });
});
