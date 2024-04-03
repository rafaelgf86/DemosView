import { Pipe, PipeTransform } from '@angular/core';
import { Resource } from '../interfaces/resource';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'resourceimage'
})
export class ResourceImagePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer ){}

  transform(resource: Resource): any {
    // console.log('resource', resource);
    return this.domSanitizer.bypassSecurityTrustResourceUrl( resource?.fileMime + ',' + resource?.fileData );
  }

}
