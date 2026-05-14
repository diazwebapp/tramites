
import type { APIRoute } from 'astro';
import type { ContratoData } from '../../types';
import {  supabase } from '../../utils/data-store';

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

    

    //Generamos el objeto Contrac
    const contract: ContratoData = {
      contractor_dni: params.personDNI,
      placa_vehiculo: params.placaVehiculo,
      desde: today,
      hasta: oneYearLater
    }

   const {data,error} =  await supabase.from("contrato_data").insert(contract).select("numero_contrato").single();
    
    if(error){
      
      return new Response(JSON.stringify({ message: 'Error insertando el contrato.'}), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'RCV Creado.', numeroContrato:data.numero_contrato }), {
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
    const {data:contrato, error} = await supabase.from("contrato_data").select("+*").eq("numero_contrato",contratoN).single()
    if(error) return new Response(null,{
        status:404
      })
      return new Response(JSON.stringify({ contrato }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

}