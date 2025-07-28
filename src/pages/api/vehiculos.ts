
import type { APIRoute } from 'astro';
import type { VehicleData } from '../../types';
import { supabase } from '../../utils/data-store';


export const POST: APIRoute = async ({ request }) => {
  try {
    const requestBody = await request.json();

    // Validate data against VehicleData type
    const vehiculo: VehicleData = requestBody as VehicleData;

    // Basic validation
    if (!vehiculo.marca || !vehiculo.modelo || !vehiculo.version || !vehiculo.anio || !vehiculo.carroceria || !vehiculo.color || !vehiculo.motor || !vehiculo.placa || !vehiculo.puestos_tonelaje || !vehiculo.tipo || !vehiculo.uso || !vehiculo.transmision) {
      return new Response(JSON.stringify({ message: 'All fields are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const {status} = await supabase.from("vehiculos").insert(vehiculo)
    if(status == 409){
      const vehiculoExistente = await supabase.from("vehiculos").select("*").eq('placa',vehiculo.placa).single()
      return new Response(JSON.stringify({ message: 'Error con supabase, el vehiculo ya existe.', vehiculo:vehiculoExistente.data }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ message: 'Vehicle created successfully.', vehiculo }), {
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
