import { c as createComponent, m as maybeRenderHead, f as renderScript, b as renderTemplate } from '../chunks/astro/server_DBBLsQVO.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="container"> <h1>Contenido no accesible</h1> </div> ${renderScript($$result, "/home/erickoficial69/projects/tramites/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/erickoficial69/projects/tramites/src/pages/index.astro", void 0);

const $$file = "/home/erickoficial69/projects/tramites/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
