import { s as supabase, g as get_person_api } from '../../chunks/data-store_DoW9dfal.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const requestBody = await request.json();
    const personData = requestBody;
    if (!personData.contractorDNI || !personData.contractorNombre || !personData.contractorDreccion || !personData.contractorTelefono) {
      return new Response(JSON.stringify({ message: "All fields are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { status } = await supabase.from("personas").insert(personData);
    if (status !== 201) {
      return new Response(JSON.stringify({ message: "Error con supabase." }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ message: "Person created successfully.", persona: personData }), {
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
const GET = async ({ request }) => {
  const dni = new URL(request.url).searchParams.get("dni");
  if (dni) {
    const cleanDNI = dni.replace(/[^0-9]/g, "").trim();
    const { data, error } = await supabase.from("personas").select("*").eq("contractorDNI", cleanDNI);
    if (error) {
      return new Response(null, {
        status: 500
      });
    }
    if (data.length === 0) {
      const { data: data2 } = await get_person_api(parseInt(cleanDNI));
      const persona = {
        contractorDNI: data2.cedula,
        contractorNombre: `${data2.primer_nombre} ${data2.segundo_nombre} ${data2.primer_apellido} ${data2.segundo_apellido}`
      };
      return new Response(JSON.stringify({ status: 404, persona }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log(data[0]);
    return new Response(JSON.stringify({ status: 200, persona: data[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response(null, {
    status: 500
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
