import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  rut: string;
  nombre: string;
  direccion: string;
  telefono: number;
  password: string;
  id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserServ {
  private apiUrl: string = 'http://127.0.0.1:8000/usuarios';

  constructor(private http: HttpClient) { }

  createUser(usuario: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, usuario)
  }

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }

}
