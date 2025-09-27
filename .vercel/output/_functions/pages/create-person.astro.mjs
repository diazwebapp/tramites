import { c as createComponent, d as createAstro, m as maybeRenderHead, f as renderScript, b as renderTemplate, e as renderComponent } from '../chunks/astro/server_DBBLsQVO.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$Layout } from '../chunks/Layout_PQAK0T1f.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$FormClient = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FormClient;
  const { personas } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form id="formPerson"> <fieldset> <legend>Name Information</legend> <label for="fullname"> <span>Full Name:</span> <input type="text" id="fullname" name="fullname" required> </label> </fieldset> <fieldset> <legend>DNI Information</legend> <label> <span>DNI:</span> <input type="text" id="dni" name="contractorDNI" required> </label> </fieldset> <fieldset> <legend>Address Information</legend> <label for="address"> <span>Address:</span> <input type="text" id="address" name="contractorDreccion" required> </label> </fieldset> <fieldset> <legend>Phone Information</legend> <label for="phone"> <span>Phone Number:</span> <input type="tel" id="phone" name="contractorTelefono" required> </label> </fieldset> <div> <button>Registrar</button> </div> </form> ${renderScript($$result, "/home/erickoficial69/projects/tramites/src/components/FormClient.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/erickoficial69/projects/tramites/src/components/FormClient.astro", void 0);

const $$CreatePerson = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <div class="form-section"> <h1>Añadir Cliente</h1> <div id="search-container"> <input type="search" name="search" placeholder="DNI" id="dniShare"> <button id="search">Buscar</button> </div> <div style="display: none;" id="create-person-form"> ${renderComponent($$result2, "FormClient", $$FormClient, {})}</div> </div> </div> ` })} ${renderScript($$result, "/home/erickoficial69/projects/tramites/src/pages/create-person.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/erickoficial69/projects/tramites/src/pages/create-person.astro", void 0);

const $$file = "/home/erickoficial69/projects/tramites/src/pages/create-person.astro";
const $$url = "/create-person";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CreatePerson,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
