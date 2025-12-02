import { Injectable } from '@angular/core';

import { Capacitor } from "@capacitor/core";
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";

export interface Usuario {
  rut: string;
  nombre: string;
  direccion: string;
}

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  private db!: SQLiteDBConnection;
  readonly db_name: string = "maskotas.db";
  readonly tbl_user: string = "usuarios";
  readonly tbl_pets: string = "mascotas";

  private sqlite: SQLiteConnection;

  private isInit: boolean = false;
  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite)
  }

  async initDB() {
    if (this.isInit) return;
    try {
      this.db = await this.sqlite.createConnection(
        this.db_name,
        false,
        'no-encryption',
        1,
        false
      );

      await this.db.open;

      const createUsersQuery = `
        CREATE TABLE IF NOT EXISTS ${this.tbl_user} (
          rut INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          direccion TEXT NOT NULL,
          password TEXT NOT NULL
        );
      `;

      const createPetsQuery = `
        CREATE TABLE IF NOT EXISTS ${this.tbl_pets} (
          id INTEGER PRIMARY KEY,
          nombre TEXT NOT NULL,
          especie TEXT NOT NULL,
          edad_meses INTEGER
        );
      `;

      await this.db.execute(createUsersQuery);
      await this.db.execute(createPetsQuery);
      console.log('Base de Datos Inicializada');
      this.isInit = true;
    } catch (error) {
      console.error(error);
    }
  }

  async addUser(rut: string, nombre: string, direccion: string) {
    try {
      if (!rut || !nombre || !direccion) {
        alert('Por favor, rellene todos los campos')
        return;
      }

      const insertQuery = `
        INSERT INTO ${this.tbl_user} (rut, nombre, direccion) VALUES (?, ?, ?);
      `;

      const values = [rut, nombre, direccion];

      await this.db.run(insertQuery, values);
      console.log('Usuario Registrado')
    } catch (error) {
      console.error(error);
    }
  }

  async addPet(nombre: string, especie: string, edad: number) {
    try {
      if (!nombre || !especie || !edad) {
        alert('Por favor, rellene todos los campos')
        return;
      }

      const insertQuery = `
        INSERT INTO ${this.tbl_pets} (id, nombre, especie, number) VALUES (?, ?, ?);
      `;

      const values = [nombre, especie, edad];

      await this.db.run(insertQuery, values);
      console.log('Mascota Registrada')
    } catch (error) {
      console.error(error);
    }
  }

  async getPets(): Promise<any[]> {
    try {
      const SelectQuery = `SELECT * FROM ${this.tbl_pets}`;
      const ans = await this.db.query(SelectQuery);
      return ans.values ? ans.values : [];

    } catch (error) {
      console.error(error);
      return[];
    }
  }

  async deleteUser(rut: string) {
    try {
      const deleteQuery= `DELETE FROM ${this.tbl_user} WHERE rut = ?`;

      await this.db.run(deleteQuery, [rut]);
      console.log("Usuario Eliminado");
    } catch (error) {
      console.error(error)
    }
  }

  async deletePet(id: number) {
    try {
      const deleteQuery= `DELETE FROM ${this.tbl_pets} WHERE id = ?`;

      await this.db.run(deleteQuery, [id]);
      console.log("Mascota Eliminada");
    } catch (error) {
      console.error(error)
    }
  }

}
