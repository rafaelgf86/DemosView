import { Component, OnInit, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResult } from '../../../../interfaces/user';
import { UserModel } from '../../../../models/user.model';
import { NgForm } from '@angular/forms';
import { AddressModel } from '../../../../models/address.model';
import { ProfilesService } from '../../../../services/profiles.service';
import { Profile, ProfilesResult } from '../../../../interfaces/profile';
import { ProfileModel } from '../../../../models/profile.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ErrorService } from '../../../../services/error.service';
import { ErrorsServerComponent } from '../../../../components/errors-server/errors-server.component';
import { Error } from 'src/app/interfaces/error';
import { SettingsService } from '../../../../services/settings.service';
import { getParams, getQueryParams } from '../../../../../assets/js/route-params';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  // Evento que permitirá emitir una accion al padre, (desplegar pantalla)
  @Output() drawerAction: EventEmitter<any> = new EventEmitter();

  // Evento del padre que muestra el toast de éxito (se utiliza en el padre para que el toast no se oculto)
  @Output() successAction: EventEmitter<any> = new EventEmitter();

  // Evento del padre que muestra el toast de error (se utiliza en el padre para que el toast no se oculto)
  @Output() errorAction: EventEmitter<any> = new EventEmitter();

  // Servicios Injectados
  usersService: UsersService;
  profilesService: ProfilesService;

  /** Objetos principales de actualización/agregación */
  user: UserModel; // Objeto asociado al formulario
  idUser: string;  // Id del objeto que se va a editar (0 si se va a agregar)

  /** Active Directory */
  activeDirectory: boolean;

  /** Paginado */
  originalPage: number; // Mantiene la página desde donde fue invocada
  searchName: string;   // Busqueda de donde fue invocada
  orderBy: number;
  order: string;

  // Loading
  loading = false;

  // Indica la navegación padre
  parentModule = 'security';

  // Perfiles
  profiles: Profile[];
  loadingProfiles = false;

  // Tipo de perfiles de esta sección
  idProfileType = 2;

  // Título de la página
  title: string;

  // Elemento que contiene al componente que muestra errores generales
  @ViewChild(ErrorsServerComponent) errorsServer: ErrorsServerComponent;

  constructor( private activatedRoute: ActivatedRoute,
               private router: Router,
               @Inject(UsersService) usersService: UsersService,
               private errorService: ErrorService,
               @Inject(ProfilesService) profilesService: ProfilesService) {
     // Inicializar servicios
     this.usersService = usersService;
     this.profilesService = profilesService;
     // Obtener datos de rutas y servicios
     this.getData();
  }

  // Obtener información de usuario y perfiles
  async getData() {
    this.loading = true;
    try {
      // Obtener params
      const params = await getParams( this.activatedRoute );
      this.idUser = params.id;
      // Obtener queryParams
      const queryParams = await getQueryParams( this.activatedRoute );
      this.originalPage = queryParams.originalPage;
      this.orderBy = queryParams.orderBy;
      this.order = queryParams.order;
      this.searchName = queryParams.searchName;
      if (this.originalPage === undefined) {
        this.originalPage = 1;
      }
      // Obtener perfiles disponibles del sistema
      this.loadingProfiles = true;
      const profilesData: ProfilesResult = await this.profilesService.getProfiles( this.idProfileType );
      if ( !profilesData || !profilesData.object ) {
        return;
      }
      this.profiles = profilesData.object;
      // Obtener el usuario o inicializarlo
      if (this.idUser !== '0') {
        const userData: UserResult = await this.usersService.getUser(this.idUser);
        if ( !userData || !userData.object ) {
          return;
        }
        this.user = userData?.object;
        console.log( 'usuario edit', userData );
        if ( !this.user.address ) {
          this.user.address = new AddressModel();
        }
        if ( !this.user.profile ) {
          this.user.profile = new ProfileModel();
        }
        // Asignar el título
        this.title = `Edición de Usuario: ${this.user?.username}`;
      } else {
        this.user = new UserModel();
        // Asignar el título
        this.title = `Alta de Usuario`;
      }
    } catch (error) {
      // Mostrar error en consola
      console.error(error);
    } finally {
      this.loading = false;
      this.loadingProfiles = false;
    }
  }

  /** Método para salvar */
  save( forma: NgForm ) {
    if ( forma.invalid ) {
      return;
    }
    // Limpiar errores
    this.user.errorFormUser = null;

    this.loading = true;
    this.usersService.save(this.user).then( (data: UserResult) => {
      // Apagar carga
      this.loading = false;
      // Si hay data
      if ( data && data.success ) {
        this.successAction.emit('El usuario ha sigo guardado exitosamente');
        this.back();
      } else if ( data && !data.success && data?.errors ) {
        // Inicializar errores de formulario
        this.user.errorFormUser = {};
        // Obtener errores del servidor
        const formErrors: Error[] = this.errorService.getErrors( data.errors );
        // Recorrer errores para asignar como corresponda
        formErrors.forEach( err => {
          this.user.errorFormUser[`${err.message}`] = err.error;
        });
        console.log('this.user.errorFormUser', this.user.errorFormUser);
        // Mostrar los errores del servidor adicionalmente en la parte superior
        this.errorsServer.errors = data.errors;
        this.errorsServer.processErrors( );
        this.errorAction.emit(`Ocurrio un error al guardar el usuario ${ this.user.username} `);
      } else {
        this.errorAction.emit(`Ocurrio un error al guardar el usuario ${ this.user.username} `);
      }
    });
  }

  drawer() {
    // emitir acción al elemento padre
    this.drawerAction.emit();
  }

  /** Método que regresa a la página de donde fue llamado, tambien se manda a llamar a la función desde el html */
  back(){
    // Redigir a perfiles, usando los queryParams para regrear de donde fue llamado
    this.router.navigate([`${this.parentModule}/users`],
    { queryParams: { page: this.originalPage,  orderBy: this.orderBy, order: this.order, searchName: this.searchName } });
   }

  ngOnInit(): void {
  }

  onSelectDate(event: NgbDateStruct) {
    console.log('event', event );
    if (event) {
      const date: Date = new Date( event.year, event.month - 1, event.day );
      this.user.birthDate = date.toISOString().split('T')[0];
    }
  }

}
