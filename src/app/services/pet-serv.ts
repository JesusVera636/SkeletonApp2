import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pet {
  nombre: string;
  especie: string;
  edad: number;
  id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PetServ {
  private apiUrl: string = 'http://127.0.0.1:8000/mascotas';

  constructor(private http: HttpClient) { }

  createPet(mascota: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, mascota)
  }

  listPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl)
  }

  getPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`)
  }

  deletePet(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

}
