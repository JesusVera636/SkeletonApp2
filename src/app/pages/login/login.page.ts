import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { UserServ, User } from 'src/app/services/user-serv';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  private router = inject(Router);

  usuarios: User[] = [];

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userSv: UserServ) {
    this.userForm = this.fb.group({
      rut: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  mensaje: string = '';

  async ngOnInit() {
    this.loadUsers();
  }

  async onSubmit() {
    this.mensaje = '';
    for (var usuario of this.usuarios) {
      if (this.userForm.value.rut == usuario.rut) {
        if (this.userForm.value.password == usuario.password) {
          this.router.navigate(['/home'], {
            state: {
              usuario
            }
          });
        }
      }
      this.mensaje = "Rut o contraseña incorrecto"
    }

  }

  loadUsers() {
    this.userSv.listUsers().subscribe({
      next: (data: User[]) => {
        this.usuarios = data;
      },
      error: (error: any) => {
        console.error("Error al Cargar Usuarios", error)
      }
    })
  }

  toRegister() {
    this.router.navigate(['/registrar']);
  }

}
