import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from "@google/generative-ai";




// Configura tu API Key en el archivo .env
const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);


export const POST: APIRoute = async ({ request }) => {
  try {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  // Prueba un texto simple antes de la imagen para descartar bloqueos
  const test = await model.generateContent("Hola");
  console.log("Conexión exitosa:", test.response.text());
} catch (e) {
  console.error("Error de conexión:", e.message);
}

  return 
  try {

    const data = await request.formData();
    const imageFile = data.get("documento") as File;

    if (!imageFile) {
      return new Response(JSON.stringify({ error: "No se subió ninguna imagen" }), { status: 400 });
    }

    // Convertir el archivo a Buffer y luego a Base64 para Gemini
    const arrayBuffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash-latest",
        generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      Analiza la imagen del Certificado de Registro de Vehículo. 
      Extrae los datos y genera un JSON con estos campos: 
      nro_certificado, propietario, rif, placa, marca, modelo, año_modelo, color, serial_niv, serial_motor.
      IMPORTANTE: Devuelve solo el objeto JSON, sin markdown ni explicaciones.
    `;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64Image, mimeType: imageFile.type } }
    ]);

    const responseText = result.response.text();
    
    return new Response(responseText, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error procesando la imagen" }), { status: 500 });
  }
};