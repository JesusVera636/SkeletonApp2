import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { Pet, PetServ } from './pet-serv';

describe('PetServ', () => {
  let service: PetServ;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PetServ,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(PetServ);
    httpMock = TestBed.inject(HttpTestingController);

    });

  afterEach(() => {
    httpMock.verify();
  });

  it('deberia Crearse', () => {
    expect(service).toBeTruthy();
  });

  it('deberia llamar GET /mascotas', () => {
    const dummyPets: Pet[] = [
      { nombre: 'Milo', especie: 'Perro', edad: 12, id: 1 },
      { nombre: 'Mikasa', especie: 'Gato', edad: 19, id: 2 }
    ];

    service.listPets().subscribe((data) =>{
      expect(data.length).toBe(2);
      expect(data[0].nombre).toBe(dummyPets[0].nombre);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/mascotas');
    expect(req.request.method).toBe('GET');

    req.flush(dummyPets);

  });

  it('deberia llamar POST /mascotas', () => {
    const dummyPet: Pet = {
      nombre: 'Honk',
      especie: 'Ganso',
      edad: 8
    };

    service.createPet(dummyPet).subscribe((data) => {
      expect(data.nombre).toBe(dummyPet.nombre);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/mascotas');

    expect(req.request.method).toBe('POST');
    expect(req.request.body.nombre).toBe(dummyPet.nombre);

    req.flush(dummyPet);

  });

});
