import { Directive, ElementRef, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements AfterContentInit  {

  constructor(private el: ElementRef){
  }

  ngAfterContentInit(){
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

}
