import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Navbar } from '../../interfaces/navbar';
import { User } from '../../interfaces/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  @Input() navbars: Navbar[] = [];
  @Input() user: User;
  @Output() emitLogout: EventEmitter<boolean>;
  notificationsCount: string[];

  isLooged = false;

  color: string;

  constructor(public translate: TranslateService, public loginService: LoginService) {
    this.emitLogout = new EventEmitter();
  }

  ngOnInit(): void {
    this.loginService.reviewIsLooged();
  }

  ngDoCheck() {
    this.isLooged = this.loginService.isLooged;
    if ( this.isLooged ) {
      this.color = localStorage.getItem('setting.mainColor');
    }
  }

  logout() {
    this.loginService.logout();
    this.emitLogout.emit(true);
  }

  switchLang(lang: string) {
    if (lang === this.translate.currentLang) {
      return;
    }
    this.translate.use(lang);
  }

  changePassword() {}

}
