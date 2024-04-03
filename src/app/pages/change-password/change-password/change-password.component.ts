import { Component, OnInit, Inject } from '@angular/core';
import { UserChangePassword } from '../../../interfaces/change-password';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { UserResult } from '../../../interfaces/user';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  // Servicios Injectados
  usersService: UsersService;

  // Objeto principal a persistir
  userChangePassword: UserChangePassword = {};

  // Loading
  loading = false;

  constructor(@Inject(UsersService) usersService: UsersService,
              private toastService: ToastService) {
    this.usersService = usersService;
  }

  ngOnInit(): void {
  }

  /** Método para salvar */
  save( forma: NgForm ) {
    console.log( 'forma', forma);
    console.log( 'userChangePassword', this.userChangePassword);
    if ( forma.invalid ) {
      return;
    }

    this.loading = true;
    this.usersService.changePassword(this.userChangePassword).then( (data: UserResult) => {
      // Si hay data
      console.log('data', data);
      if ( data && data.success ) {
        this.toastService.showSuccess('El usuario ha sigo guardado exitosamente');
        // No se desactiva loading
      } else {
        // Apagar carga
        this.loading = false;
        this.toastService.showError('Ocurrio un error al intentar actualizar su contraseña');
      }
    });
  }

}
