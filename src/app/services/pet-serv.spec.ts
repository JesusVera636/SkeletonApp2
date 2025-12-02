import { TestBed } from '@angular/core/testing';

import { PetServ } from './pet-serv';

describe('PetServ', () => {
  let service: PetServ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
