import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { User } from '../services/user-serv';
import { Pet, PetServ } from '../services/pet-serv';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule ]
})

export class HomePage {

  private router = inject(Router);

  nombre: string = '';

  mascotas: Pet[] = []; 

  constructor(private petSv: PetServ) { }

  ngOnInit() {
    const state = history.state as {usuario?: User};
    this.nombre = state?.usuario?.nombre ?? '';
    this.loadPets();
  }

  petRegister() {
    this.router.navigate(['/reg-mascota']);
  }

  petList() {
    this.router.navigate(['/vermascotas']);
  }

  loadPets() {
    this.petSv.listPets().subscribe({
      next: (data: Pet[]) => {
        this.mascotas = data;
      },
      error: (error: any) => {
        console.error("Error al Cargar Mascotas", error)
      }
    })
  }

  adopt(id: any) {
    this.petSv.deletePet(id).subscribe({
      next: () => {
        this.mascotas = this.mascotas.filter(mascota => mascota.id !== id);
        console.log(`Mascota ${id} Eliminada`)
      },
      error: (error: any) => {
        console.error("Error al Eliminar", error)
      }
    });
    this.loadPets();
  }

}


