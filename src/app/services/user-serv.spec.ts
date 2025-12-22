import { TestBed } from '@angular/core/testing';

import { User, UserServ } from './user-serv';
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
  
    it('deberia llamar GET /usuarios', () => {
      const dummyUsers: User[] = [
        { rut: '10500-1', nombre: 'Larry', telefono: 111222, direccion: 'Monterreal', password: 'secreto' },
        { rut: '132200-2', nombre: 'Mate', telefono: 332111, direccion: 'Cuevafalsa', password: 'privado' }
      ];
  
      service.listUsers().subscribe((data) =>{
        expect(data.length).toBe(2);
        expect(data[0].rut).toBe(dummyUsers[0].rut);
      });
  
      const req = httpMock.expectOne('http://127.0.0.1:8000/usuarios');
      expect(req.request.method).toBe('GET');
  
      req.flush(dummyUsers);
  
    });
  
    it('deberia llamar POST /usuarios', () => {
      const dummyUser: User = {
        rut: '10500-1',
        nombre: 'James',
        telefono: 111222,
        direccion: 'Monterreal',
        password: 'secreto'
      };
  
      service.createUser(dummyUser).subscribe((data) => {
        expect(data.rut).toBe(dummyUser.rut);
      });
  
      const req = httpMock.expectOne('http://127.0.0.1:8000/usuarios');
  
      expect(req.request.method).toBe('POST');
      expect(req.request.body.rut).toBe(dummyUser.rut);
  
      req.flush(dummyUser);
  
    });
});
