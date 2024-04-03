import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Menu } from '../../../interfaces/list';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContactUsComponent } from 'src/app/components/modals/modal-contact-us/modal-contact-us.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  // Loading
  loading = false;           // Indica si la página esta cargando
  menus: Menu[];

  constructor(private loginService: LoginService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.menus = this.loginService.getNav();
    this.loading = false;
    console.log('menus', this.menus);
  }

  navigate( url: string ) {
    this.router.navigate([`${url}`]);
  }

  showContactModal() {
    this.modalService.open(ModalContactUsComponent, { size: 'xl' });
  }

}
