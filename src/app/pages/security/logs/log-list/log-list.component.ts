import { Component, OnInit, EventEmitter, Output, Inject, HostListener } from '@angular/core';
import { LogsService } from '../../../../services/logs.service';
import { LogsResult, Log } from '../../../../interfaces/log';
import { environment as envSystem } from '../../../../../environments/environment.prod';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInformationComponent } from '../../../../components/modals/modal-information/modal-information.component';
import { LogTypesResult, LogType } from '../../../../interfaces/logType';
import { Header } from '../../../../interfaces/header';
import { Paginate } from '../../../../interfaces/paginate';
import { orderingBy, navigatePagination, rowSelected, escape, getParameters } from '../../../../../assets/js/pagination-utils';
import { LOGS_HEADER } from 'src/app/data/headers/log.headers';
const RECORDS_BY_PAGE = envSystem.recordsByPage;

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html'
})
export class LogListComponent implements OnInit {

  @Output() drawerAction: EventEmitter<any> = new EventEmitter();

  // Servicios Injectados
  logsService: LogsService;

  // Lista de elementos
  logTypes: LogType[] = [];

  // Campo de busqueda
  searchLogType: number;
  searchError = false;

  // Paginado
  paginate: Paginate = {
    page: 1,
    recordsByPage: RECORDS_BY_PAGE,
    orderBy: 5,
    order: 'desc',
    parentModule: 'security'
  };

  searchMap: any;                  // Mapa de busquedas para enviar a paginación

  // Loading
  loading = false;           // Indica si la página esta cargando

  // Modal que mostrará el detalle del registro
  modalService: NgbModal;

  // Headers
  headers: Header[] = LOGS_HEADER;

  constructor(
    @Inject(LogsService) logsService: LogsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(NgbModal) modalService: NgbModal
  ) {
    this.logsService = logsService;
    this.modalService = modalService;
  }

  ngOnInit() {
    this.getLogTypes();
    this.getActivateRoute();
  }

  getLogTypes() {
    this.logsService.getLogTypes().then( (data: LogTypesResult) => {
      console.log( 'logTypes', data );
      // Guardar la data en el objeto a pintarse e el html
      this.logTypes = data?.object;
    });
  }

  getActivateRoute() {
    // Activar loading
    // Obtener los parámetros recibidos, en este caso queryParams
    this.activatedRoute.queryParams.subscribe( params => {
      console.log('params', params);
      // Obtenemos la página que se va a mostrar para enviarla al servicio de usuarios, si no existe inicializar en 1
      getParameters( this.paginate, params );
      // Obtenemos el campo por el que se esta buscando, si no existe inicializar en vacío
      this.searchLogType = params.searchLogType !== undefined ? params.searchLogType : 0;
      this.searchError = params.searchError !== undefined && params.searchError !== 'false' ? params.searchError : '';
      // Mandar a crear el mapa de busquedas, no incluye page
      this.createMap();
      // Obtener las ervies
      this.getLogs();
    });
  }

  getLogs() {
    this.loading = true;
    console.log('paginate', this.paginate);
    this.logsService.getLogs(this.paginate, this.searchLogType, this.searchError)
    .then( (data: LogsResult) => {
      console.log( 'logs', data );
      // Guardar la data en el objeto a pintarse e el html
      this.paginate.results = data;
      this.paginate.objects = data?.objects;
      // Apagar loading
      this.loading = false;
    });
  }

  /**
   * Función para realizar la búsqueda
   */
   buscar(){
    // Establecer la pagina 1
    this.paginate.page = 1;
    // Buscar
    this.getLogs();
  }

  createMap(){
    // Inicializar mapa de busquedas
    this.searchMap = new Map();
    // Agregar los campos de busqueda
    this.searchMap.set('searchLogType', this.searchLogType);
    this.searchMap.set('searchError', this.searchError);
  }

  /** Función para ocultar o mostrar menu lateral, se emite el evento al padre */
  drawer() {
    // emitir acción al elemento padre
    this.drawerAction.emit();
  }

  /** Función de selección de Fila */
  rowSelected(log: Log) {
    rowSelected( log, this.paginate );
  }

  /** Eventos emitidos con teclas */
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    escape( this.paginate );
  }

  /** Función para revisar el detalle del log */
  review( logOpen: Log ) {
    console.log('review');
    const modal = this.modalService.open(ModalInformationComponent, { size: 'lg', backdrop: 'static' });
    modal.componentInstance.titulo = 'Detalle de Registro';
    modal.componentInstance.texto = '';
    modal.componentInstance.information = logOpen.trace;
  }

  /**
   * Funcion que se emite en el hijo ára navegar
   */
   navigatePagination( event: any) {
    if ( navigatePagination( this.paginate, event.page ) ) {
      this.getLogs();
    }
  }

  orderingBy( header: Header ) {
    if ( orderingBy( this.paginate, this.headers, header ) ) {
      this.getLogs();
    }
  }

}
