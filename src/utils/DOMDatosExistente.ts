import type { PersonData, VehicleData } from "../types";

export const createDOMElement = (data:VehicleData | PersonData,DOMElement:HTMLElement)=>{
    for (const clave in data) {
        if (data.hasOwnProperty(clave)) { // Asegúrate de que la propiedad es propia del objeto
          const valor = data[clave];

          // Crea un párrafo para cada par clave-valor
          const parrafo = document.createElement('p');
          parrafo.innerHTML = `<b>${clave}:</b> ${valor}`; // Texto del párrafo

          DOMElement.appendChild(parrafo); // Añade el párrafo al contenedor
        }
      }
}