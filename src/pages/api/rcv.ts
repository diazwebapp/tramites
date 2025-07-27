
import type { APIRoute } from 'astro';
import type { ContratoData } from '../../types';
import { readDataStore, writeDataStore } from '../../utils/data-store';
import { formatDate } from '../../utils/dates';
const dataStore = await readDataStore()
export const POST: APIRoute = async ({ request }) => {
  try {
    const requestBody = await request.json();

    // Validate data against PersonData type
    const params = requestBody;
    
    // Basic validation
    if (!params.personDNI || !params.placaVehiculo) {
      return new Response(JSON.stringify({ message: 'All fields are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Obtener fechas
    const today = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1); // Sumar 1 año

    //Calcular el numero de contratos para generar el numero de rcv
    const contratoBase = dataStore.ncontratoBase
    const reciboBase = dataStore.nreciboBase
    const cantidadContratos = dataStore.contratos.length
    const numeroContrato = contratoBase + cantidadContratos
    const numeroRecibo = reciboBase + cantidadContratos

    //Actualizamos los nuevos numeros base
    dataStore.ncontratoBase = numeroContrato
    dataStore.nreciboBase = numeroRecibo
    //Generamos el objeto Contrac
    const contract: ContratoData = {
      numero_contrato: numeroContrato,
      numero_recibo: numeroRecibo,
      personDNI: params.personDNI,
      placaVehiculo: params.placaVehiculo,
      Desde: formatDate(today),
      Hasta: formatDate(oneYearLater),
    }
    // Add new person
    dataStore.contratos.push(contract);

    // Write updated data
    await writeDataStore(dataStore);

    return new Response(JSON.stringify({ message: 'RCV Creado.', numeroContrato }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error creating person:", error);
    return new Response(JSON.stringify({ message: 'Internal server error.'}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const GET: APIRoute = async ({request}) => {
    let numeroContrato = new URL(request.url).searchParams.get('contrato');
    if(!numeroContrato) return new Response(null,{
        status:500
        })
    let contratoN = parseInt(numeroContrato)
    const contrato = dataStore.contratos.find(contrato => contrato.numero_contrato === contratoN)
    if(!contrato) return new Response(null,{
        status:404
      })
      return new Response(JSON.stringify({ contrato }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

}