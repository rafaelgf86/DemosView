import { Pipe, PipeTransform } from '@angular/core';
import { Resource } from '../interfaces/resource';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'resourcefile'
})
export class ResourceFilePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer ){}

  transform(resource: Resource): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl( resource?.fileMime + ',' + resource?.fileData );
  }

}
