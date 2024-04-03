import { Address, Sepomex, SepomexId } from '../interfaces/address';

export class AddressModel implements Address{

    idAddress: number;
    street: string;
    exteriorNumber: string;
    interiorNumber: string;
    sepomex: SepomexModel;
    constructor() {
      this.sepomex = new SepomexModel();
    }
  }

export class SepomexModel implements Sepomex{

    sepomexId: SepomexIdModel;
    constructor() {
      this.sepomexId = new SepomexIdModel();
    }
}

export class SepomexIdModel implements SepomexId{

    dCodigo: string;
    cEstado: string;
    cMnpio: string;
    idAsentaCpcons: string;
    constructor() {
      this.cEstado = '0';
      this.cMnpio = '0';
      this.idAsentaCpcons = '0';
    }

}
