import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../interfaces/address';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(address: Address, includeSpomex: boolean = false): string {
    if ( !address || !address.sepomex ) {
      return '';
    }

    let addressString = `${address.street} ${address.exteriorNumber} ${address.interiorNumber}  ${address.sepomex?.sepomexId.dCodigo}`;
    if ( includeSpomex && address.sepomex) {
      addressString += ` ${address.sepomex.dEstado} ${address.sepomex.dMnpio} ${address.sepomex.dAsenta}`;
    }
    return  addressString;
  }

}
