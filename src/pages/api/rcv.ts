
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
    const contratos = await supabase.from("contratos").select("numero_contrato",{ count: 'exact', head: true })
    const ncontratoBase = await supabase.from("ncontratoBase").select("numero").order('id', { ascending: false }).limit(1).single()
    const nreciboBase = await supabase.from("nreciboBase").select("numero").order('id', { ascending: false }).limit(1).single()
   
    // Obtener fechas
    const today = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1); // Sumar 1 año

    //Calcular el numero de contratos para generar el numero de rcv
    const cantidadContratos = contratos.count
    const numeroContrato = ncontratoBase.data?.numero + cantidadContratos
    const numeroRecibo = nreciboBase.data?.numero + cantidadContratos

    //Generamos el objeto Contrac
    const contract: ContratoData = {
      numero_contrato: numeroContrato,
      numero_recibo: numeroRecibo,
      personDNI: params.personDNI,
      placaVehiculo: params.placaVehiculo,
      desde: today,
      hasta: oneYearLater
    }

   const inserContract =  await supabase.from("contratos").insert(contract)
   const inserNCbase = await supabase.from("ncontratoBase").insert({numero:numeroContrato})
   const insertNRbase =  await supabase.from("nreciboBase").insert({numero:numeroRecibo})
    if(inserContract.error){
      return new Response(JSON.stringify({ message: 'Error insertando el contrato.'}), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if(inserNCbase.error){
      return new Response(JSON.stringify({ message: 'Error insertando el numero de contrato base.'}), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if(insertNRbase.error){
      return new Response(JSON.stringify({ message: 'Error insertando el numero de recibo base.'}), {
        status:500,
        headers: { 'Content-Type': 'application/json' },
      });
      
    }
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
    const {data:contrato, error} = await supabase.from("contratos").select("+*").eq("numero_contrato",contratoN).single()
    if(error) return new Response(null,{
        status:404
      })
      return new Response(JSON.stringify({ contrato }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

}