import { Header } from '../../app/interfaces/header';
import { Paginate } from '../../app/interfaces/paginate';

export const orderingBy = ( paginate: Paginate, headers: Header[], header: Header ): boolean => {
    try {
        // restablecer header
        headers.forEach( h => {
            h.orderApply =  null;
        });
        // Si el orden actual es diferente al recibido cambiar order by y respetar el order
        if ( paginate.orderBy !== header.ordering ){
            paginate.orderBy =  header.ordering;
        }
        // En caso contrario cambiar el order
        else {
            if (paginate.order === 'asc' ){
                paginate.order = 'desc';
            } else{
                paginate.order = 'asc';
            }
        }
        // Aplicar para que muestre la imagen del header
        header.orderApply = paginate.order;
        return true;
    } catch (error) {
        console.error( error );
        return false;
    }
};

export const navigatePagination = ( paginate: Paginate,  page: number): boolean => {
    try {
        paginate.page = page;
        return true;
    } catch (error) {
        console.error( error );
        return false;
    }
};

export const getParameters = (  paginate: Paginate, params: any ) => {
    if ( !paginate ) {
        return;
    }
    try {
        // Obtenemos la página que se va a mostrar para enviarla al servicio de usuarios, si no existe inicializar en 1
        paginate.page = params.page !== undefined ? params.page : paginate.page;
        paginate.orderBy = params.orderBy !== undefined ? params.orderBy : paginate.orderBy;
        paginate.order = params.order !== undefined ? params.order : paginate.order;
    } catch (error) {
        console.error( error );
        return false;
    }
};

export const rowSelected = ( object: any,  paginate: Paginate ): boolean => {
    try {
        // Recorrer los objetos para apagar reiniciar sus valores de rowSelected
        paginate.objects.forEach( (obj: any) => {
            obj.rowSelected = false;
        });
        // Indicar que el obket es el nuevo seleccionado
        object.rowSelected = true;
        // Asignar
        paginate.objectSelected = object;
        return true;
    } catch (error) {
        console.error( error );
        return false;
    }
};

export const escape = async (  paginate: Paginate ): Promise<boolean> => {
    return new Promise( ( resolve, reject) => {
        try {
            // Recorrer los objetos para apagar reiniciar sus valores de rowSelected
            paginate.objects.forEach( (obj: any) => {
                obj.rowSelected = false;
            });
            // Desmarcar el actual
            paginate.objectSelected = null;
            resolve( true );
        } catch (error) {
            resolve( false );
        }
    });
};
