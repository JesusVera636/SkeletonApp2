import { Injectable } from '@angular/core';

import type { Photo } from '@capacitor/camera';

import { Filesystem, Directory } from '@capacitor/filesystem';


@Injectable({
  providedIn: 'root',
})
export class CameraServ {
  public photos: FotoUser[] = [];

  public async guardar(capturedPhoto: Photo) {
    var temp: string = '';
    this.aGaleria(capturedPhoto).then(res => {
      temp = res.filepath;
    });
    return temp;
  }

  public async aGaleria(capturedPhoto: Photo) {

    const savedImageFile = await this.guardarFoto(capturedPhoto);

    this.photos.unshift(savedImageFile);
    return savedImageFile;
  }

  private async guardarFoto(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const base64Data = (await this.convertBlobToBase64(blob)) as string;

    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    }
    
  }

  private convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

}

export interface FotoUser {
  filepath: string;
  webviewPath?: string;
}
