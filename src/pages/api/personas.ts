
import type { APIRoute } from 'astro';
import type { PersonData } from '../../types';
import { readDataStore, writeDataStore } from '../../utils/data-store';

export const POST: APIRoute = async ({ request }) => {
  try {
    const requestBody = await request.json();

    // Validate data against PersonData type
    const personData: PersonData = requestBody as PersonData;

    // Basic validation
    if (!personData.contractorDNI || !personData.contractorNombre || !personData.contractorDreccion || !personData.contractorTelefono) {
      return new Response(JSON.stringify({ message: 'All fields are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Read existing data
    const dataStore = await readDataStore();

    // Check for uniqueness based on DNI
    if (dataStore.personas.some(persona => persona.contractorDNI.toLowerCase() === personData.contractorDNI.toLowerCase())) {
      return new Response(JSON.stringify({ message: 'Person with this DNI already exists.' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Add new person
    dataStore.personas.push(personData);

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
  const dni = new URL(request.url).searchParams.get('dni');
  if(dni){
    const data = await readDataStore()
    const persona = data.personas.find(persona => persona.contractorDNI === dni)
    if (!persona) {
      return new Response(null, {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ status: 200, persona }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(null,{
    status:500
  })
}