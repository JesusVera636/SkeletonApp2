import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegMascotaPage } from './reg-mascota.page';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RegMascotaPage', () => {
  let component: RegMascotaPage;
  let fixture: ComponentFixture<RegMascotaPage>;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegMascotaPage,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    component = TestBed.inject(RegMascotaPage);
    httpMock = TestBed.inject(HttpTestingController);

    });

  afterEach(() => {
    httpMock.verify();
  });

  it('deberia Crearse', () => {
    expect(component).toBeTruthy();
  });
});
