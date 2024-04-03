import { Component, OnInit, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '../../../../assets/ckeditor5-custom-build/ckeditor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactUsService } from 'src/app/services/contact-us.service';

@Component({
  selector: 'app-modal-contact-us',
  templateUrl: './modal-contact-us.component.html',
  styleUrls: ['./modal-contact-us.component.css']
})
export class ModalContactUsComponent implements OnInit {

  public Editor = ClassicEditor;

  editorConfig = {
    toolbar: {
      resize_enabled: true,
      items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'indent',
          'outdent',
          '|',
          'blockQuote',
          'mediaEmbed',
          'imageUpload',
          // 'ckfinder',
          '|',
          'insertTable',
          'tableColumn',
          'tableRow',
          'mergeTableCells',
          '|',
          'undo',
          'redo',
      ]
    },
    image: {
      styles: [
        'alignLeft',
        'alignCenter',
        'alignRight'
      ],
      resizeOptions: [
        {
            name: 'imageResize:original',
            label: 'Original',
            value: null
        },
        {
            name: 'imageResize:50',
            label: '50%',
            value: '50'
        },
        {
            name: 'imageResize:75',
            label: '75%',
            value: '75'
        }
      ],
      toolbar: [
        // 'imageStyle:full',
        // 'imageStyle:side',
        'imageStyle:alignLeft',
        'imageStyle:alignCenter',
        'imageStyle:alignRight',
        '|',
        'imageResize',
        '|',
        'imageTextAlternative'
      ]
    },
    language: 'en'
  };

  contactService: ContactUsService;

  // para validaciones del form
  forma: FormGroup;
  // bandera para deshabilitar el boton de envio
  enabledSubmit: boolean;
  // bandera que indica si mostrar o no la pantalla de carga
  loading: boolean;
  // bandera para mostrar mensaje
  showSuccess: boolean;

  constructor(public activeModal: NgbActiveModal, @Inject(ContactUsService) contactService: ContactUsService) {
    this.enabledSubmit = true;
    this.loading = false;
    this.showSuccess = false;
    this.contactService = contactService;
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.forma = new FormGroup({
      forname: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern('^([_A-Za-z0-9-]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,}),?)+$')]),
      comment: new FormControl('', Validators.required)
    });
  }

  sendEmail() {
    console.log(this.forma.value);
    if (this.forma.valid) {
      this.enabledSubmit = false;
      this.loading = true;
      this.contactService.send(this.forma.value).then((response: boolean) => {
        if (response) {
          this.showSuccess = true;
          setTimeout(() => {
              this.activeModal.close();
          }, 800);
        }
      }).catch((reason) => console.log(reason))
      .finally(() => {
        this.loading = false;
        this.enabledSubmit = true;
      });
    }
  }

}
