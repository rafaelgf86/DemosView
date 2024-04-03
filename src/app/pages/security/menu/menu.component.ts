import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { Section } from '../../../interfaces/section';
import { LoginService } from '../../../services/login.service';
import { LateralMenu } from '../../../interfaces/list';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  sections: Section[] = [];
  url = 'security';

  // Menu lateral
  lateralMenu: LateralMenu;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.getLateralMenu();
    // console.log(this.lateralMenu);
  }

  async getLateralMenu() {
    this.lateralMenu = this.loginService.getLateralMenu('Seguridad', this.url);
  }

}
