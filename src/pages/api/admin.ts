import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const {admin}:any = request.body
    if(!admin){
        return new Response(null, {status: 500})
    }
    if(admin == "erickoficial69-78789846") return new Response(null, {status: 200})
        return new Response(null, {status: 500})

}