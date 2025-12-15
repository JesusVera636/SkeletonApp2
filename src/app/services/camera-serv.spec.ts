import { TestBed } from '@angular/core/testing';

import { CameraServ } from './camera-serv';

describe('CameraServ', () => {
  let service: CameraServ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
