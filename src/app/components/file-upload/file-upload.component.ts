import { Component, OnInit, Input } from '@angular/core';
import { PreviewImageService } from '../../services/preview-image.service';
import { ResourceModel } from '../../models/resource.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent implements OnInit {

  // Elemento del formulario que debe contener un objeto tipo Address
  @Input() elementForm: any;

  // Elemento para saber si se oculta la etiqueta
  @Input() hiddeLabel = false;

  // Nombre del recurso, ejemplo logo
  @Input() resourceName: string;

  // Nombre del recurso, ejemplo logo
  @Input() textField: string;

  // Indica si el elemento es una imagen, por defecto es verdadero
  @Input() isImage = true;

  // Indica que elementos se pueden cargar
  accept: string;

  // Indica si hay un error en el archivo cargado
  @Input() errorFile = false;
  @Input() errorFileMessage: string;

  // Texto por defecto para el campo de selección de archvio
  textInputFile: string;

  constructor(public previewImageService: PreviewImageService) {
    this.errorFileMessage = '';
  }

  ngOnInit(): void {
    // console.log('elementForm', this.elementForm);
    if ( this.isImage ) {
      this.accept = 'image/*';
      this.textInputFile = 'Choose file (img)';
    } else {
      this.accept = '*/*';
      this.textInputFile = 'Choose file';
    }
  }

   /** Método para cargar el archivo en base 64 */
   fileChangeEvent( file: any ) {
    // Apagar bandera de error del archivo
    this.errorFile = false;
    this.errorFileMessage = '';
    // Utilizar servicio para obtener valor en base 64 (se regresa una promesa)
    this.previewImageService.getData(file.files, this.isImage ).then( data => {
      // console.log( 'data', data);
      // Cuando no haya data
      if ( !data || data === 'No supported' ) {
        // Eliminar objeto de logo de empresa
        this.elementForm[this.resourceName] = new ResourceModel();
        // Mostrar cadena vacia
        file.value = '';
        // Mostrar error
        this.errorFile = true;
        // Colocar el nombre en blanco
        this.errorFileMessage = 'Not Supported';
      } else {
        // Crear objeto de FileModel
        this.elementForm[this.resourceName] = new ResourceModel();
        // Separ la data por la ,
        const d = data.split(',');
        // Colocar datos correspondientes
        this.elementForm[this.resourceName].fileMime = d[0];
        this.elementForm[this.resourceName].fileData = d[1];
        this.elementForm[this.resourceName].fileName = file.files[0].name;
        this.elementForm[this.resourceName].description = this.resourceName;
        // Colocar el nombre del archivo
        this.textInputFile = file.files[0].name;
      }
      // console.log( 'elementForm', this.elementForm);
    });
  }

}
