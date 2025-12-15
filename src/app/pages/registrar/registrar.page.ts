import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { User, UserServ } from 'src/app/services/user-serv';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, IonicModule ]
})
export class RegistrarPage {
  private router = inject(Router);

  userForm: FormGroup;

  isSubmitting: boolean = false;

  mensaje: string = '';
  errorMsj: string = '';

  constructor(private fb: FormBuilder, private userServ: UserServ) {
    this.userForm = this.fb.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: [0, Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.mensaje = '';
    this.errorMsj = '';

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.errorMsj = 'Por favor complete todos los campos';
      return;
    }

    this.isSubmitting = true;

    this.userServ.createUser(this.userForm.value).subscribe({
      next: (user: User) => {
        console.log("Usuario Registrado", user);
        this.mensaje = "Usuario Registrado";
        this.isSubmitting = false;
        this.userForm.reset();

        this.router.navigate(['/login']);

      },
      error: (error: any) => {
        console.error("Error al Agregar Usuario", error)
        this.errorMsj = error.error?.detail || "Error al Agregar Usuario";
        this.isSubmitting = false;
      }
    });

  }


}
