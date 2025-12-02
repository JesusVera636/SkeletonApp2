import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { LoadingComponent } from 'src/app/shared/loader-overlay/loader-overlay.component';

import { UserServ, User } from 'src/app/services/user-serv';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule, LoadingComponent]
})
export class LoginPage implements OnInit {
  @ViewChild('loader') loader?: LoadingComponent;
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
      this.mensaje = "Usuario o contraseña incorrecto"
    }

  }

  iniciarCarga() {
    this.loader?.showfor(1000);
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
