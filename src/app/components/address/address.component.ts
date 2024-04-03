import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Estado, Municipio, Asentamiento } from '../../interfaces/sepomex';
import { SepomexService } from '../../services/sepomex.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddressComponent } from '../modals/modal-address/modal-address.component';
import { Sepomex } from '../../interfaces/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html'
})
export class AddressComponent implements OnInit {

  // Servicios Injectados
  sepomexService: SepomexService;

  // Elemento del formulario que debe contener un objeto tipo Address
  @Input() elementForm: any;

  // Para combos
  estados: Estado[];
  municipios: Municipio[];
  asentamientos: Asentamiento[];
  loadingEstados = false;
  loadingMunicipios = false;
  loadingAsentamientos = false;

  // Modal que mostrará las direcciones encontradas para un CP
  modalService: NgbModal;

  constructor(@Inject(SepomexService) sepomexService: SepomexService,
              @Inject(NgbModal) modalService: NgbModal) {
    this.sepomexService = sepomexService;
    this.modalService = modalService;
  }

  ngOnInit(): void {
    this.getEstados();
  }

  getEstados() {
    // Vaciar los arreglos de municipios y estados
    this.municipios = [];
    this.asentamientos = [];
    // Mostrar carga de Estados
    this.loadingEstados = true;
    // Cargar Estados
    this.sepomexService.getEstados().then( (data: Estado[]) => {
      if ( data  ) {
        this.estados = data;
        this.getMunicipios( false );
        this.getAsentamientos( false );
      }
      this.loadingEstados = false;
    });
  }

  /** Metodo que ocurre al cambiar el combo de estados */
  getMunicipios( resetCombos = true ) {
    // Vaciar los arreglos de municipios y estados
    this.municipios = [];
    this.asentamientos = [];
    if ( resetCombos ) {
      // Inicializar el ngmodel de los combos (para mostrar por defecto el Seleccione)
      this.elementForm.address.sepomex.sepomexId.cMnpio = '0';
      this.elementForm.address.sepomex.sepomexId.idAsentaCpcons = '0';
    }
    // Validar que se haya seleccionado un estado
    const cEstado: string = this.elementForm.address?.sepomex?.sepomexId?.cEstado;
    if ( !cEstado || cEstado === '0') {
      return;
    }
    // Mostrar carga de Municipios
    this.loadingMunicipios = true;
    // Cargar Municipios
    this.sepomexService.getMunicipios( cEstado ).then( (data: Municipio[]) => {
      if ( data  ) {
        this.municipios = data;
      }
      this.loadingMunicipios = false;
    });
  }

  /** Metodo que ocurre al cambiar el combo de municipios */
  getAsentamientos( resetCombos = true ) {
     // Vaciar los arreglos de asentamiento
    this.asentamientos = [];
    if ( resetCombos ) {
      // Inicializar el ngmodel de los combos (para mostrar por defecto el Seleccione)
      this.elementForm.address.sepomex.sepomexId.idAsentaCpcons = '0';
    }
    // Validar que se haya seleccionado un municipio
    const cEstado: string = this.elementForm.address?.sepomex?.sepomexId?.cEstado;
    const cMnpio: string = this.elementForm.address?.sepomex?.sepomexId?.cMnpio;
    if ( !cEstado || cEstado === '0' ||  !cMnpio || cMnpio === '0') {
      return;
    }
    // Mostrar carga de Asentamientos
    this.loadingAsentamientos = true;
    // Cargar Asentamientos
    this.sepomexService.getAsentamientos( cEstado, cMnpio ).then( (data: Asentamiento[]) => {
      if ( data  ) {
        this.asentamientos = data;
      }
      this.loadingAsentamientos = false;
    });
  }

  selectAsentamiento( event: any ) {
      // console.log(event.target.value);
      const asentamientoId = event.target.value;
      if ( asentamientoId === 0 ) {
        this.elementForm.address.sepomex.sepomexId.dCodigo = '';
        return;
      }
      // Buscar en el arreglo de asentamientos el que corresponda al id
      const asentamientoSelected = this.asentamientos.find( (a: Asentamiento) => a.idAsentaCpcons === asentamientoId );
      // Colocar el CP
      if ( asentamientoSelected ) {
        this.elementForm.address.sepomex.sepomexId.dCodigo = asentamientoSelected.dCodigo;
      }
  }

  /** Método que obtiene todos los datos de asentamiento de sepomex */
  getSepomex() {
    const cp: string = this.elementForm.address.sepomex.sepomexId.dCodigo;
    // console.log( 'cp', cp);
    if ( cp  ) {
      this.loadingEstados = true;
      // this.sepomexService.getSepomex( cp ).then( (data: Sepomex[]) => {
      //   this.loadingEstados = false;
      //   // console.log ( data );
      //   if ( !data || data.length === 0) {
      //     this.elementForm.address.sepomex.sepomexId.cEstado = 0;
      //     this.elementForm.address.sepomex.sepomexId.cMnpio = 0;
      //     this.elementForm.address.sepomex.sepomexId.idAsentaCpcons = 0;
      //     return;
      //   }
      //   // Si solo hay un elemento
      //   if ( data.length === 1) {
      //     this.elementForm.address.sepomex.sepomexId.cEstado = data[0].sepomexId.cEstado;
      //     this.elementForm.address.sepomex.sepomexId.cMnpio = data[0].sepomexId.cMnpio;
      //     this.elementForm.address.sepomex.sepomexId.idAsentaCpcons = data[0].sepomexId.idAsentaCpcons;
      //     this.getMunicipios( false );
      //     this.getAsentamientos( false );
      //   } else {
      //     const modal = this.modalService.open(ModalAddressComponent, { /* size: 'sm', */backdrop: 'static' });
      //     modal.componentInstance.sepomex = data;
      //     modal.componentInstance.elementForm = this.elementForm;
      //     // Validar cuando el modal se cierre por medio de la selección de una dirección
      //     modal.result.then( (result: string) => {
      //       if ( result === 'success' ) {
      //         this.getMunicipios( false );
      //         this.getAsentamientos( false );
      //       }
      //     }, (reason) => {
      //     });
      //   }
      // });
    }
  }
}
