import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Pet, PetServ } from 'src/app/services/pet-serv';

@Component({
  selector: 'app-reg-mascota',
  templateUrl: './reg-mascota.page.html',
  styleUrls: ['./reg-mascota.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, IonicModule ]
})
export class RegMascotaPage{

  petForm: FormGroup;

  isSubmitting: boolean = false;

  mensaje: string = '';
  errorMsj: string = '';

  constructor(private fb: FormBuilder, private petServ: PetServ) {
    this.petForm = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      edad: [0, Validators.required],
    });
  }

  onSubmit() {
    this.mensaje = '';
    this.errorMsj = '';

    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched();
      this.errorMsj = 'Por favor complete todos los campos';
      return;
    }

    this.isSubmitting = true;

    this.petServ.createPet(this.petForm.value).subscribe({
      next: (pet: Pet) => {
        console.log("Mascota Registrada", pet);
        this.mensaje = "Mascota Registrada";
        this.isSubmitting = false;
        this.petForm.reset();
      },
      error: (error: any) => {
        console.error("Error al Agregar Mascota", error)
        this.errorMsj = error.error?.detail || "Error al Agregar Mascota";
        this.isSubmitting = false;
      }
    });

  }

}
