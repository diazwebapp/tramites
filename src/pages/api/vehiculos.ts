
import type { APIRoute } from 'astro';
import type { VehicleData } from '../../types';
import { readDataStore, writeDataStore } from '../../utils/data-store';
// Read existing data
const dataStore = await readDataStore();
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

    
    // Check for uniqueness based on DNI
    if (dataStore.vehiculos.some(v => v.placa.toLowerCase() === vehiculo.placa.toLowerCase())) {
      return new Response(JSON.stringify({ message: 'Person with this DNI already exists.', vehiculo }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Add new person
    dataStore.vehiculos.push(vehiculo);

    // Write updated data
    await writeDataStore(dataStore);

    return new Response(JSON.stringify({ message: 'Person created successfully.' }), {
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

export const GET: APIRoute = async({ request })=>{
  const placa = new URL(request.url).searchParams.get('placa');
  if(placa){
    const data = await readDataStore()
    const vehiculo = data.vehiculos.find(vehiculo => vehiculo.placa === placa)
    if (!vehiculo) {
      return new Response(null, {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ vehiculo }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(null,{
    status:500
  })
}