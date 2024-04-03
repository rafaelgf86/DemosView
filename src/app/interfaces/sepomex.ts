export interface EstadosResult {
  success: boolean;
  errors: Errors;
  messagesCodes: boolean;
  object: Estado[];
}

export interface Estado {
  cEstado: string;
  dEstado: string;
}

export interface MunicipiosResult {
  success: boolean;
  errors: Errors;
  messagesCodes: boolean;
  object: Municipio[];
}

export interface Municipio {
  cMnpio: string;
  dMnpio: string;
}

export interface AsentamientosResult {
  success: boolean;
  errors: Errors;
  messagesCodes: boolean;
  object: Asentamiento[];
}

export interface Asentamiento {
  idAsentaCpcons: string;
  dAsenta: string;
  dCodigo: string;
}

export interface Errors {}