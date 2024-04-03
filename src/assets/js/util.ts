/** Función que devuelve un arreglo de años */
export const getYears = (): number[] => {
    // Inicializar arreglo
    const years = [];
    const Xmas = new Date();
    const actualYear = Xmas.getFullYear();
    for ( let i = actualYear - 5 ; i <= actualYear + 5; i++ ) {
      years.push(i);
    }
    return years;
};

/**
 * Funcion que remueve el objeto recibido de su lista
 * @param list Lista de donde se remover el elemento
 * @param element Elemento dentro de la lista a remover
 * @return true en caso de exito, false en cualquier otro caso
 */
export const removeItem = (list: any[], element: any): boolean => {
  const index = list.indexOf(element);
  if (index > -1) {
     list.splice(index, 1);
     return true;
  }
  return false;
};
