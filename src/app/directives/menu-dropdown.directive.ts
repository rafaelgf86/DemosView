import { Directive, ElementRef, AfterContentInit } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[appMenuDropdown]'
})
export class MenuDropdownDirective implements AfterContentInit  {

  constructor(private el: ElementRef) {
  }

  ngAfterContentInit() {
    $('.dropdown-menu a.dropdown-toggle').on('click', function(event) {
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
      }
      const $subMenu = $(this).next('.dropdown-menu');
      $subMenu.toggleClass('show');
      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', (e) => {
        $('.dropdown-submenu .show').removeClass('show');
      });
      return false;
    });
  }

}
