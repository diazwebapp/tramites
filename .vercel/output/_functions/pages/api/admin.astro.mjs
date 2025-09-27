export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  const { admin } = request.body;
  if (!admin) {
    return new Response(null, { status: 500 });
  }
  if (admin == "erickoficial69-78789846") return new Response(null, { status: 200 });
  return new Response(null, { status: 500 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
