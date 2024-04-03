import { Directive, AfterContentInit, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterContentInit  {

  @Input() public appAutoFocus: boolean;

  constructor(private el: ElementRef) {
  }

  ngAfterContentInit() {
    this.el.nativeElement.focus();
  }

}
