import { Component, OnInit, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { UsersResult, User } from '../../../../interfaces/user';
import { environment as envSystem } from '../../../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalConfirmationComponent } from '../../../../components/modals/modal-confirmation/modal-confirmation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { USERS_HEADER } from '../../../../data/headers/user.headers';
import { Header } from '../../../../interfaces/header';
import { orderingBy, navigatePagination, rowSelected, escape, getParameters } from '../../../../../assets/js/pagination-utils';
import { Paginate } from '../../../../interfaces/paginate';
const RECORDS_BY_PAGE = envSystem.recordsByPage;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  // Evento que permitirá emitir una accion al padre, (desplegar pantalla)
  @Output() drawerAction: EventEmitter<any> = new EventEmitter();

  // Evento del padre que muestra el toast de éxito (se utiliza en el padre para que el toast no se oculto)
  @Output() successAction: EventEmitter<any> = new EventEmitter();

  // Evento del padre que muestra el toast de error (se utiliza en el padre para que el toast no se oculto)
  @Output() errorAction: EventEmitter<any> = new EventEmitter();

  // Servicios Injectados
  usersService: UsersService;

  // Campo de busqueda
  searchName: string;

  // Paginado
  paginate: Paginate = {
    page: 1,
    recordsByPage: RECORDS_BY_PAGE,
    orderBy: 1,
    order: 'asc',
    parentModule: 'security'
  };

  // Header a mostrar
  headers = USERS_HEADER;

  // Loading
  loading = false;           // Indica si la página esta cargando

  // Modal
  modalService: NgbModal;

  constructor(
    @Inject(UsersService) usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(NgbModal) modalService: NgbModal
  ) {
    this.modalService = modalService;
    this.usersService = usersService;
  }

  ngOnInit(): void {
    this.getActivateRoute();
  }

  getActivateRoute() {
    // Activar loading
    // Obtener los parámetros recibidos, en este caso queryParams
    this.activatedRoute.queryParams.subscribe( params => {
      // Obtenemos la página que se va a mostrar para enviarla al servicio de usuarios, si no existe inicializar en 1
      getParameters( this.paginate, params );
      // Obtenemos el campo por el que se esta buscando, si no existe inicializar en vacío
      this.searchName = params.searchName !== undefined ? params.searchName : '';
      // Obtener las ervies
      this.getUsers();
    });
  }

  getUsers() {
    this.loading = true;
    // Obtener los parámetros recibidos, en este caso queryParams
    this.usersService.getUsers(this.paginate, this.searchName).then( (data: UsersResult) => {
      // Guardar la data en el objeto a pintarse en el html
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
     this.getUsers();
  }

  /**
   * Función de editar
   */
  edit() {
    if ( !this.paginate.objectSelected ){
      return;
    }
    const queryParams = this.getQueryParams();
    this.router.navigate([`${this.paginate.parentModule}/users/${this.paginate.objectSelected.idUser}`], queryParams);
  }

  /**
   * Función de agregar
   */
  add() {
    const queryParams = this.getQueryParams();
    this.router.navigate([`${this.paginate.parentModule}/users/0`], queryParams);
  }

  /**
   * Función que regresa los queryparams actualespara enviar a donde corresponda
   */
  getQueryParams(){
    return { queryParams:
      { originalPage: this.paginate.page, orderBy: this.paginate.orderBy, order: this.paginate.order, searchName: this.searchName } };
  }

  /**
   * Función de selección de Fila
   */
  rowSelected(user: User) {
    rowSelected( user, this.paginate );
  }

  /**
   * Funcion que se emite en el hijo para navegar
   */
  navigatePagination( event: any) {
    if ( navigatePagination( this.paginate, event.page ) ) {
      this.getUsers();
    }
  }

  /**
   * Funcion para realizar el ordenamiento al dar click en un encabezado de la tabla
   */
  orderingBy( header: Header ) {
    if ( orderingBy( this.paginate, this.headers, header ) ) {
      this.getUsers();
    }
  }

  /**
   * Función para actualizar el estatus del usuario
   */
  updateStatus( usuario: User, status: number ){
    const modalConfirm = this.modalService.open(ModalConfirmationComponent, { backdrop: 'static' });
    modalConfirm.componentInstance.title = `Confirmar Cambio de Estatus`;
    modalConfirm.componentInstance.name = `Guardar Estatus: ${usuario.username} `;
    modalConfirm.componentInstance.aditionalData = `El estatus de la actualización pasará a ${ status === 1 ? 'Activo' : 'Desactivo'}. ¿Esta seguro de realizar la actualización?`;
    // modalConfirm.componentInstance.warning = 'Esta acción no puede ser desecha';
    // verificamos la opcion seleccionada por el usuario
    modalConfirm.result.then((result) => {
      // solo si confirman la accion reemplazamos
      if (result) {
        this.loading = true;
        this.usersService.updateStatus(usuario, status).then( (data: any) => {
          // Apagar carga
          this.loading = false;
          console.log(data);
          // Si hay data
          if ( data && data.success ) {
            this.successAction.emit('El usuario ha sido guardado exitosamente');
            usuario.statusUser = status;
          } else {
            this.errorAction.emit('Ocurrio un error al guardar el estatus del usuario');
          }
        });
      } else {
        console.log('Rechazo');
      }
    });
   }

  /** Eventos emitidos con teclas */
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    escape( this.paginate );
  }

  /** Función para ocultar o mostrar menu lateral, se emite el evento al padre */
  drawer() {
    // emitir acción al elemento padre
    this.drawerAction.emit();
  }

}
