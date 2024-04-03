import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviewImageService {

  constructor() { }

  getData(files: any, isImage = true): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        // Validar que existan archivos
        if (files.length === 0) {
          resolve('');
        }
        // Obtener el mime type del elemento
        const mimeType = files[0].type;
        // En caso de no ser un elemento imagen enviar error y finalizar
        if (mimeType.match(/image\/*/) == null && isImage ) {
          resolve('No supported');
        }

        // Obtener la data de la imagen
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);

        // Mostrar imagen en el objeto imgURL recibido
        reader.onload = (event) => {
          resolve(reader.result);
        };
      }
    );
  }

  preview(files: any, imgURL: any, mensaje: any) {
    // limpiar la imagen
    imgURL.nativeElement.src = '';

    // Validar que existan archivos
    if (files.length === 0) {
      return;
    }
    // Obtener el mime type del elemento
    const mimeType = files[0].type;
    // En caso de no ser un elemento imagen enviar error y finalizar
    if (mimeType.match(/image\/*/) == null) {
      mensaje.nativeElement.innerText =  'Only images are supported.';
      return;
    }

    // Obtener la data de la imagen
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    // Mostrar imagen en el objeto imgURL recibido
    reader.onload = (event) => {
      imgURL.nativeElement.src = reader.result;
    };

  }

}
