
export interface Address {
    idAddress: number;
    street: string;
    exteriorNumber: string;
    interiorNumber: string;
    homePhone?: string;
    officePhone?: string;
    sepomex: Sepomex;
  }

export interface Sepomex {
    sepomexId: SepomexId;
    dAsenta?: string;
    dTipoAsenta?: string;
    dMnpio?: string;
    dEstado?: string;
    dCiudad?: string;
    dCP?: string;
    cCveCiudad?: string;
  }

export interface SepomexId {
    dCodigo: string;
    cEstado: string;
    cMnpio: string;
    idAsentaCpcons: string;
  }


// Individual
export interface SepomexResult {
    success: boolean;
    errors: {};
    messagesCodes: boolean;
    object: Sepomex[];
  }
