import { s as supabase } from '../../chunks/data-store_DoW9dfal.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const requestBody = await request.json();
    const vehiculo = requestBody;
    if (!vehiculo.marca || !vehiculo.modelo || !vehiculo.clase || !vehiculo.anio || !vehiculo.carroceria || !vehiculo.color || !vehiculo.motor || !vehiculo.placa || !vehiculo.puestos_tonelaje || !vehiculo.tipo || !vehiculo.uso) {
      return new Response(JSON.stringify({ message: "All fields are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { status } = await supabase.from("vehiculos").insert(vehiculo);
    if (status == 409) {
      const vehiculoExistente = await supabase.from("vehiculos").select("*").eq("placa", vehiculo.placa).single();
      return new Response(JSON.stringify({ message: "Error con supabase, el vehiculo ya existe.", vehiculo: vehiculoExistente.data }), {
        status: 409,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ message: "Vehicle created successfully.", vehiculo }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating person:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
