import { TestBed } from '@angular/core/testing';

import { UserServ } from './user-serv';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserServ', () => {
  let service: UserServ;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserServ,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(UserServ);
    httpMock = TestBed.inject(HttpTestingController);

    });

  afterEach(() => {
    httpMock.verify();
  });

  it('deberia Crearse', () => {
    expect(service).toBeTruthy();
  });
});
