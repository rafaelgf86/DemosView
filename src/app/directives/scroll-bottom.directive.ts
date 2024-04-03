import { Directive, ElementRef, AfterContentInit, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[appScrollBottom]'
})
export class ScrollBottomDirective implements AfterContentInit  {

  constructor(private el: ElementRef){
  }

  ngAfterContentInit(){
    try {
      this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
