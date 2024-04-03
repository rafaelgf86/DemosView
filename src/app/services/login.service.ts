import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment as envSystem} from '../../environments/environment.prod';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { Section } from '../interfaces/section';
import { NAVBAR_DATA } from '../data/section.data';
import { Navbar } from '../interfaces/navbar';
import { SettingResult } from '../interfaces/setting';
import { UserModel } from '../models/user.model';
import { LateralMenu, Menu } from '../interfaces/list';

const URL = envSystem.url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private router: Router,
              private error: ErrorService,
             ) { }

  isLooged = false;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  /**
   * Método que se encarga de loguearse en el servidor
   * @param username    Nombre de Usuario
   * @param password    Password de Usuario
   */
  login( user: UserModel): Observable<any> {
    // URL
    const loginURL = `${ URL }/login`;
    // Realizar la solicitud del login
    // Si se quieren los header debe enviar observe: 'response' para obtener toda la información y no solo el body
    // Ej.  { headers: this.headers, observe: 'response' }. NOTA: Cambia el formato de respuesta
    return this.http.post<any>( loginURL , user, { headers: this.headers },  ).pipe(
      map(data => {
        if ( !data ) {
          return;
        }

        // en caso de ser status 1 se le concedera acceso y se guarda el token en el localStorage
        if (data.status_login === '1') {
          // console.log('Token', data['token']);
          this.addInitDataLocalStorage(data, user.username);
        }
        return data;
      }),
      catchError(this.error.handleError<boolean>('Login'))
    );
  }

  addInitDataLocalStorage(data: any, login: string) {
    // Crear token
    this.crearToken(data.token);
    this.crearSettings();
    this.addToLocalStorage('sections', JSON.stringify(data.sections));
  }

  crearToken( token: string) {
    this.addToLocalStorage('token', token);
    this.isLooged = true;
  }

  crearSettings() {
    this.getSettings().then( (data: SettingResult) => {
      // Guardar la data en el objeto a pintarse en el html
      const setting = data?.object;
      if ( setting && setting.mainColor !== '' ) {
        this.addToLocalStorage( 'setting.mainColor', '0 2px 4px 0 ' + setting.mainColor );
      } else {
        this.addToLocalStorage( 'setting.mainColor', '0 2px 4px 0 #003F7F' );
      }
      this.addToLocalStorage( 'seeting.logo.fileData', setting.logo ? setting.logo.fileData : '');
      this.addToLocalStorage( 'seeting.logo.fileMime', setting.logo ? setting.logo.fileMime : '');
    }
    );
  }

  async getSettings() {
    // Preparar URL
    const uri = `${ URL }/settings`;
    // Obtener los http Headers
    const httpHeaders = await this.prepareHeaders();
    // Si se pudieron obtener realizar la petición de enterprises
    if ( httpHeaders ) {
      // Realizar la petición
      return this.http.get<SettingResult>( uri, { headers: httpHeaders } )
                  .pipe(
                    catchError(this.error.handleError<string>('Settings')),
                    map( (data: SettingResult) => data ? data : null)
                  )
                  .toPromise();
    }
  }

  addToLocalStorage(key: string, value: string) {
    localStorage.removeItem(key);
    localStorage.setItem(key, value);
  }

  logout( expired: boolean = false ) {
    if ( !this.isLooged  ) {
      return;
    }
    // Guardar la empresa
    const idEnterprise = localStorage.getItem('idEnterprise');
    // Remover items
    localStorage.removeItem('token');
    localStorage.removeItem('sections');
    localStorage.removeItem('seeting.mainColor');
    localStorage.removeItem( 'seeting.logo.fileData');
    localStorage.removeItem( 'seeting.logo.fileMime');
    // desacrivar estatus
    this.isLooged = false;
    // redirigir
    this.router.navigateByUrl(`/login`);
  }

  reviewIsLooged() {
    return new Promise( (resolve) => {
      if (localStorage.getItem('token')) {
        this.isLooged = true;
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  async prepareHeaders(contentType: string = 'application/json'): Promise<HttpHeaders> {
    // Obtener el nuevo token
    const token = await this.getToken();
    // Si se pudo obtener generar los headers
    if ( token ) {
      if (contentType !== null && contentType !== '') {
        return new HttpHeaders({
          'Content-Type': contentType,
          Authorization: token
        });
      } else {
        return new HttpHeaders({
          Authorization: token
        });
      }
    }
  }

  async getToken(): Promise<string> {
    // Mediante un http generar el refresh token. Esperar a que la petición termine antes de continuar
    const data: any = await this.refreshToken();
    let token: string;
    // Si la data fue obtenida correctamente en el refresh
    if ( data ) {
      // console.log('data', data);
      token = data.token;
      if ( token ) {
        this.crearToken(token);
      }
      else if (data.error_authorization && data.error_authorization === 'Invalid token') {
        // this.error.mostrarModal(data.error_authorization, data.error_authorization_message);
        this.logout( true );
      }
      else {
        console.error('Fallo al refresh', data);
      }
    }
    return token;
  }

  refreshToken() {
    const token =  localStorage.getItem('token');
    if ( !token ) {
      this.logout();
    } else {
      const loginURL = `${ URL }/refreshToken`;
      const headers =  new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      });
      return this.http.get(loginURL, { headers }).pipe(catchError(this.error.handleError<string>('Login'))).toPromise();
    }
  }

  getSectionsChild(url: string) {
    // Inicializar lista
    const sections: Section[] = [];
    // Secciones regresadas por el servidor, contienen los permisos del usuario
    const sectionsByProfile: Section[] = JSON.parse(localStorage.getItem('sections'));
    // console.log( 'sectionsByProfile', sectionsByProfile);
    if ( !sectionsByProfile ) {
      return;
    }
    // Buscar el navbar que le corresponde a esta sección
    const navbar: Navbar = NAVBAR_DATA.find( nav => nav.url === url);
    // filtrar
    if ( !navbar || !navbar.sections ) {
      return;
    }
    navbar.sections.forEach( nav => {
      sectionsByProfile.forEach(section => {
        if ( section.idSection === nav.idSection ) {
          sections.push(nav);
        }
      });
    });

    return sections;
  }

  /** Método que devuelve el menu lateral de la sección */
  getLateralMenu(listTitle: string, url: string) {
    const lateralMenu: LateralMenu = {
      listTitle,
      url,
      menus: []
    };
    // Obtener las subsecciones (permitidas a su perfil) donde la url sea administración
    const sections = this.getSectionsChild(url);
    // Crear la lista de menus para enviar al componente de dropdown
    sections.forEach( (section: Section) => {
      const menu: Menu = {
        url: section.url,
        name: section.name,
        icon: section.icon,
        children: [],
        iconShortAccess: section.iconShortAccess,
        descriptionShortAccess: section.descriptionShortAccess,
        classShortAccess: section.classShortAccess
      };
      // Agregar a la lista de menus laterales
      lateralMenu.menus.push(menu);
    });
    return lateralMenu;
  }

  /** Método que devuelve los navs en formato de Menu para la página de bienvenida */
  getNav() {
    // Lista de navbars permitidos
    const menuBienvenida: Menu[] = [];
    // Obtener las secciones del perfil
    const sectionsByProfile: Section[] = JSON.parse(localStorage.getItem('sections'));
    if ( !sectionsByProfile ) {
      return menuBienvenida;
    }
    // Obtener todos los navbar del sistema
    const navs: Navbar[] = NAVBAR_DATA;
    // Por cada sección del navbar
    navs.forEach( (nav: Navbar) => {
      if ( nav.sections ) {
        // Recorrer las secciones permitidas
        for (const sec of nav.sections) {
          // Buscar la sección dentro de las secciones del nav
          const secBuscada =  nav.sections.find( (s: Section) => s.idSection === sec.idSection );
          // Si se encontro guardar y romper el primer ciclo
          if ( secBuscada ) {
            const menu: Menu = {
              url: nav.url,
              iconShortAccess: nav.iconShortAccess,
              descriptionShortAccess: nav.descriptionShortAccess,
              classShortAccess: nav.classShortAccess
            };
            menuBienvenida.push(menu);

            break;
          }
        }
      } else if (nav.idSection === -1) {
        const menu: Menu = {
          url: nav.url,
          name: nav.nameNav,
          iconShortAccess: nav.iconShortAccess,
          descriptionShortAccess: nav.descriptionShortAccess,
          classShortAccess: nav.classShortAccess
        };
        menuBienvenida.push(menu);
      }
    });
    return menuBienvenida;
  }

}
