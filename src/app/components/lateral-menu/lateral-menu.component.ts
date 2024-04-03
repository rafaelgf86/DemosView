import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LateralMenu } from '../../interfaces/list';
import { MatSidenav } from '@angular/material/sidenav';
import { ToastService } from '../../services/toast.service';
import { Router, NavigationEnd } from '@angular/router';
import { EspereService } from '../../services/espere.service';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css']
})
export class LateralMenuComponent implements OnInit {

  @Input() lateralMenu: LateralMenu;
  @ViewChild('drawer') drawer: MatSidenav;
  // Mostrar menu central
  showCentralMenu: boolean;

  constructor(public toastService: ToastService, private router: Router, private  espereService: EspereService) {
    let url = this.router.url;
    // si la url tiene mas de dos slash significa que estamos en una ruta hija, por lo que se ocultara el menu central
    this.showCentralMenu = url.split('/').length <= 2;
    this.router.events.subscribe((event: any) => {
      // console.log('ROUTER EVENTS...');
      if (event instanceof NavigationEnd) {
        url = event.url;
        this.showCentralMenu = url.split('/').length <= 2;
      }
    });
  }

  ngOnInit(): void {
  }

  onActivate( componentReference: any ) {
    // console.log('componentReference', componentReference);
    componentReference.drawerAction?.subscribe(() => {
      // Acción que es recibida de los componentes hijos
      // console.log('Drawer Action.');
      this.drawer.toggle();
    });
    componentReference.successAction?.subscribe(( event: any ) => {
      // console.log('Success Action.', event);
      this.toastService.showSuccess(event);
    });
    componentReference.errorAction?.subscribe(( event: any ) => {
      // console.log('Error Action.', event);
      this.toastService.showError(event);
    });
  }

  click(event: any) {
    this.showCentralMenu = false;
  }

  navigate( url: string ) {
    this.showCentralMenu = false;
    this.router.navigate([`${this.lateralMenu.url}/${url}`]);
  }

}
