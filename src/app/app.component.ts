import { Component, OnInit, Inject } from '@angular/core';
import { Section } from './interfaces/section';
import { NAVBAR_DATA } from './data/section.data';
import { Navbar } from './interfaces/navbar';
import { User } from './interfaces/user';
import { UsersService } from './services/users.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Certificate Manager';
  navbars: Navbar[] = [];
  user: User;
  usersService: UsersService;

  constructor( public translate: TranslateService, @Inject(UsersService) usersService: UsersService ) {
    this.usersService = usersService;
    this.translate.addLangs(['en', 'es']);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');
  }

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    this.clearMenu();

    if ( !localStorage.getItem('sections') ) {
      return;
    }

    // Secciones regresadas por el servidor, contienen los permisos del usuario
    const sectionsByProfile: Section[] = JSON.parse(localStorage.getItem('sections'));
    // Si no hay permisos finalizar
    if ( !sectionsByProfile ) {
      return;
    }
    // Recorrer el Navbar del Sistema
    NAVBAR_DATA.forEach ( (navBar: Navbar) => {
      let addNavBar = false;
      // Si el navbar no tiene hijos entonces es menu directo y hay que evaluar su idSection
      if ( !navBar.sections ) {
        // Revisar si se tiene permiso
        sectionsByProfile.forEach ( (section: Section) => {
          if ( section.idSection === navBar.idSection ) {
            addNavBar = true;
          }
        });
      }
      // Si tiene secciones
      else {
        // Recorrer secciones hijas
        navBar.sections.forEach ( (sectionNavBar: Section) => {
          sectionsByProfile.forEach ( (section: Section) => {
            if ( section.idSection === sectionNavBar.idSection ) {
              addNavBar = true;
            }
          });
        });
      }
      // Si se cumplieron las condiciones agregar el nuevo NAVBAR
      if ( addNavBar || navBar.idSection === -1 ) {
        this.navbars.push( navBar );
      }
    });

    // Una vez generado el menu obtener la información del usuario, esta se manda tambien al navbar
    this.usersService.getCurrentUser().then( data => {
      if ( data && data.success ) {
        this.user = data.object;
      }
    });
  }

  clearMenu() {
    this.navbars = [];
    this.user = null;
  }
}
