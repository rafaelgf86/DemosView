import { Header } from './header';

export interface Paginate {
    page?: number;          // Número de pagina actual, recibido a través de _activatedRoute
    recordsByPage?: number; // Indica el número de registros por página, se ocupa tanto en el servicio como en la paginación
    orderBy?: number;       // Columna por la que se ordenara
    order?: string;         // Modo de ordenamiento, asc or desc
    objects?: any[];        // Objectos que se estan mostrando
    objectSelected?: any;   // Objeto seleccionado por el usuario
    results?: any;          // resultados totales
    parentModule?: string;  // Indica la navegación padre en el paginado
}
