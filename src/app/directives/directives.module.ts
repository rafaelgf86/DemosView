import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesRoutingModule } from './directives-routing.module';
import { HighlightDirective } from './highlight.directive';
import { MenuDropdownDirective } from './menu-dropdown.directive';
import { ScrollBottomDirective } from './scroll-bottom.directive';
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  declarations: [
    HighlightDirective,
    MenuDropdownDirective,
    ScrollBottomDirective,
    AutofocusDirective
  ],
  exports: [
    HighlightDirective,
    MenuDropdownDirective,
    ScrollBottomDirective,
    AutofocusDirective
  ],
  imports: [
    CommonModule,
    DirectivesRoutingModule
  ]
})
export class DirectivesModule { }
