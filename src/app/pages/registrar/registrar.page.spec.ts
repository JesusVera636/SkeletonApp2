import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarPage } from './registrar.page';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RegistrarPage', () => {
  let component: RegistrarPage;
  let fixture: ComponentFixture<RegistrarPage>;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegistrarPage,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
RegistrarPage
    component = TestBed.inject(RegistrarPage);
    httpMock = TestBed.inject(HttpTestingController);

    });

  afterEach(() => {
    httpMock.verify();
  });

  it('deberia Crearse', () => {
    expect(component).toBeTruthy();
  });
});
