import { Injectable, TemplateRef  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  // Push new Toasts to array with content and options
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  // Callback method to remove Toast DOM element from view
  remove( toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showSuccess( message: string ) {
    this.show(message, {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Toast Header'
    });
  }

  showError( message: string ) {
    this.show(message, {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Error!!!'
    });
  }

}
