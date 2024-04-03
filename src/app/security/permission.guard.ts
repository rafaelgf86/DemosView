import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { NAVBAR_DATA } from '../data/section.data';
import { Section } from '../interfaces/section';
import { Navbar } from '../interfaces/navbar';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  initURL = 'welcome';

  sectionFound: number;

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Inicializar bandera
    this.sectionFound = null;

    // Recuperar el token del local storage
    const token =  localStorage.getItem('token');

    // Si no hay token y la navegación es hacia el login permitir el acceso
    if ( !token && (state.url === '/login' || state.url.startsWith('/login')) ) {
      // Regresar el acceso permitido
      return true;
    }

    // Si no tiene un token valido
    if ( !token ) {
      // Ejecutar logout
      this.loginService.logout();
      // Guardar la ruta a la que intento acceder, de esta manera una vez logueado se puede redirigir
      const routeAnterior = state.url.substring(0, state.url.indexOf('?') !== -1 ? state.url.indexOf('?') : state.url.length);
      // Guardar la ruta en un parametro y redirigir al login
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: routeAnterior }
      });
      // Regresar el acceso denegado
      return false;
    }

    // console.log('state.url', state.url);
    // Para el caso de un token valido revisar si es la página de ingreso.
    // console.log( 'state.url', state.url );
    if ( state.url.startsWith('/login')
    ) {
      // Si se tiene token y se quiere redirigir al login lo mandamos a la pagina de inicio
      this.router.navigate( [`/${ this.initURL }`] );
      return true;
    } else if (state.url === '/welcome' || state.url === '/change-password') {
      // si se tiene token y se quiere redirigir a la pagina de welcome lo dejamos
      return true;
    } else {
      // validamos el permiso de navegacion
      const concedido = this.canNavigate(state.url);
      if (!concedido) {
        // en caso de no tener permiso lo redirigimos a la pagina de welcome
        this.router.navigate(['/welcome']);
      }
      return concedido;
    }

  }

  canNavigate(pathToNavigate: string): boolean {
    let concedido = true;
    const firstSlash = pathToNavigate.lastIndexOf('/') === -1 ? 0 : pathToNavigate.lastIndexOf('/') + 1;
    const lastSlash = (pathToNavigate.indexOf('?', firstSlash) !== -1 ? pathToNavigate.indexOf('?', firstSlash) : pathToNavigate.length);
    const principalPath =  pathToNavigate.substring(firstSlash, lastSlash);
    // solo en caso de que no sea la pagina de inicio o la de ingreso validamos el acceso
    if (pathToNavigate !== '/login') {
      // Usamos la función recursiva para obtener la sección a la que se intenta acceder
      this.getSection( principalPath, NAVBAR_DATA );
      // Recuperamos la sección
      const idSection: number = this.sectionFound;
      // Validamos que se haya encontrado
      if (!idSection) {
        return false;
      }
      // Obtenemos las secciones del usuario
      const sections: Section[] = JSON.parse(localStorage.getItem('sections'));
      // Validar si el id se encuentra
      if (!sections || !sections.find( s => s.idSection === idSection ) ) {
        concedido = false;
      }
    }
    // console.log('validacion de permiso: ' + concedido);
    return concedido;
  }

  /**
   * Función recursiva que ermite obtener la sección (de existir) que le corresponde al nombre dado
   * Una vez que se encuentra se almacena en  this.sectionFound
   */
  getSection( principalPath: string, navbars: Navbar[] ) {
     // Si la sección ya se encontro en otro ciclo paralelo, ya no es necesario seguir recorriendo
     if ( this.sectionFound ) {
       return;
     }
     // Recorremos la data para saber a que id le corresponde
     navbars.forEach( (navBar: Navbar) => {
        // Si es una sección directa comparar
        if ( !navBar.sections ) {
          if ( principalPath === navBar.url ) {
            this.sectionFound = navBar.idSection;
          }
        } else {
          // Buscar en los hijos de la sección
          const section: Section = navBar.sections.find( s => s.url === principalPath );
          if ( section ) {
            this.sectionFound = section.idSection;
           }
        }
     });
  }


}
