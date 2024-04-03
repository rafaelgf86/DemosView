import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'innerHtml'
})
export class InnerHtmlPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer ){}

  transform(html: string): any {
    return this.domSanitizer.bypassSecurityTrustHtml( html );
  }


}
