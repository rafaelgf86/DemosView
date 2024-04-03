/** Método para descargar el excel */
export const downloadFile = ( data: any, name: string) => {
    try {
      const file = dataURLtoFile(data, name);
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(file);
      elem.download = file.name;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    } catch ( exception ) {
        console.error(exception);
    }
};

/** Función que convierte base64 a objeto File */
export const dataURLtoFile = (dataurl: string, filename: string) => {
    const bstr = atob(dataurl);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename);
};
