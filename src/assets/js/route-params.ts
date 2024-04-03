import { ActivatedRoute } from '@angular/router';

export const getParams: any = (activatedRoute: ActivatedRoute) => {
    return new Promise( (resolve ) => {
       // Obtener los parámetros recibidos, en este caso params
       activatedRoute.params.subscribe( params => {
        // Regresamos los parametros
        resolve(params);
      });
    });
};

export const getQueryParams: any = (activatedRoute: ActivatedRoute) => {
    return new Promise( (resolve ) => {
       // Obtener los parámetros recibidos, en este caso params
       activatedRoute.queryParams.subscribe( queryParams => {
        // Regresamos los parametros
        resolve(queryParams);
      });
    });
};
