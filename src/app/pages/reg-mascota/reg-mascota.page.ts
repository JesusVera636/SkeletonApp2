import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Pet, PetServ } from 'src/app/services/pet-serv';
import { Router } from '@angular/router';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { CameraServ } from 'src/app/services/camera-serv';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';

@Component({
  selector: 'app-reg-mascota',
  templateUrl: './reg-mascota.page.html',
  styleUrls: ['./reg-mascota.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, IonicModule, LoaderComponent ]
})
export class RegMascotaPage{
  @ViewChild('loader') loader?: LoaderComponent;

  private router = inject(Router);
  private camera = inject(CameraServ);

  petForm: FormGroup;

  isSubmitting: boolean = false;

  mensaje: string = '';
  errorMsj: string = '';

  dirFoto: string = '';

  foto?: Photo;

  constructor(private fb: FormBuilder, private petServ: PetServ) {
    this.petForm = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      edad: [0, Validators.required]
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

    this.loader?.showfor(2500);
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

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 70,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      this.foto = image ?? undefined;
      console.log("Foto Tomada")

    } catch (error) {
      console.error("Error al tomar la foto", error)
    }
  }

  async cargarFoto() {
    if (this.foto == undefined) {
      this.errorMsj = "Error al Cargar Foto";
    } else {
      this.camera.guardar(this.foto).then(res => {
        this.dirFoto = res;
      });
      this.petForm.value.imagen = this.dirFoto;
      this.mensaje = "Imagen Cargada";
      this.errorMsj = '';
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
