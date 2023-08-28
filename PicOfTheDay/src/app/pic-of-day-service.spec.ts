import { TestBed } from '@angular/core/testing';

import { PicOfDayService } from './pic-of-day-service.service';

describe('PicOfDayService', () => {
  let service: PicOfDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicOfDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
