import 'kleur/colors';
import { g as decodeKey } from './chunks/astro/server_DBBLsQVO.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CXhsjNob.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/erickoficial69/projects/tramites/","cacheDir":"file:///home/erickoficial69/projects/tramites/node_modules/.astro/","outDir":"file:///home/erickoficial69/projects/tramites/dist/","srcDir":"file:///home/erickoficial69/projects/tramites/src/","publicDir":"file:///home/erickoficial69/projects/tramites/public/","buildClientDir":"file:///home/erickoficial69/projects/tramites/dist/client/","buildServerDir":"file:///home/erickoficial69/projects/tramites/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin.ts","pathname":"/api/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/personas","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/personas\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"personas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/personas.ts","pathname":"/api/personas","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/rcv","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/rcv\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"rcv","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/rcv.ts","pathname":"/api/rcv","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/vehiculos","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/vehiculos\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"vehiculos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/vehiculos.ts","pathname":"/api/vehiculos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"[data-astro-cid-sckkx6r4]{margin:0;padding:0;box-sizing:border-box}html,body{background-color:#fff;width:100%;height:100%}\n"}],"routeData":{"route":"/create-person","isIndex":false,"type":"page","pattern":"^\\/create-person\\/?$","segments":[[{"content":"create-person","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/create-person.astro","pathname":"/create-person","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"[data-astro-cid-sckkx6r4]{margin:0;padding:0;box-sizing:border-box}html,body{background-color:#fff;width:100%;height:100%}\nform[data-astro-cid-7ancnibb]{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}\n"}],"routeData":{"route":"/create-vehicle","isIndex":false,"type":"page","pattern":"^\\/create-vehicle\\/?$","segments":[[{"content":"create-vehicle","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/create-vehicle.astro","pathname":"/create-vehicle","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"[data-astro-cid-4mnbsbnn]{margin:0;padding:0;box-sizing:border-box}html{background-color:gray}#plantilla[data-astro-cid-4mnbsbnn]{margin:0 auto;width:210mm;-webkit-print-color-adjust:exact;print-color-adjust:exact;background-color:#fff;font-size:9pt;display:none}header[data-astro-cid-4mnbsbnn]{display:flex;justify-content:space-between}.regitation-date[data-astro-cid-4mnbsbnn]{display:grid;grid-template-columns:repeat(4,1fr);overflow:hidden}.form-group[data-astro-cid-4mnbsbnn],.form-group[data-astro-cid-4mnbsbnn] label[data-astro-cid-4mnbsbnn]{display:flex}input[data-astro-cid-4mnbsbnn]{padding:0;border:1px solid gray;background-color:transparent}.card-side[data-astro-cid-4mnbsbnn]{display:flex;justify-content:center;gap:2px}.card[data-astro-cid-4mnbsbnn]{position:relative;width:360px;height:auto;overflow:hidden;aspect-ratio:1.586;-webkit-print-color-adjust:exact;print-color-adjust:exact;padding:.04in;border:1px solid black;z-index:2;display:block;*{font-size:8pt;font-family:arial;line-height:1.3;span{text-transform:uppercase}}}.table-data[data-astro-cid-4mnbsbnn] b[data-astro-cid-4mnbsbnn]{font-size:9pt}.card-header[data-astro-cid-4mnbsbnn]{display:grid;grid-template-columns:50px 1fr;align-items:flex-start;.logo{width:50px;height:50px;img{width:100%;height:100%}}.header-text{width:100%;font-weight:700;padding-left:10px;p{width:100%;text-align:center;font-size:14pt}b,span{font-size:11pt}div{display:flex;justify-content:space-between;width:100%;padding:0}}}.back[data-astro-cid-4mnbsbnn]{background:unset;text-align:center;.qr{display:flex;justify-content:center}}.data-container[data-astro-cid-4mnbsbnn]{.title{text-align:center;background-color:#cfcbcb;border-bottom:1px solid black}border:1px solid black}span[data-astro-cid-4mnbsbnn][contenteditable][data-placeholder]:empty:before{content:attr(data-placeholder);color:#999;display:inline-block}span[data-astro-cid-4mnbsbnn][contenteditable][data-placeholder]:empty:not(:focus):before{opacity:.7}span[data-astro-cid-4mnbsbnn][contenteditable]{min-height:20px;padding:5px;border:1px solid #ccc;display:inline-block;vertical-align:middle;text-transform:uppercase}@media print{button[data-astro-cid-4mnbsbnn]{display:none}span[data-astro-cid-4mnbsbnn][contenteditable]{border:none}#plantilla[data-astro-cid-4mnbsbnn]{position:relative;left:unset;display:block}}.container-info[data-astro-cid-34s7mdjv]{padding-top:40px;width:100%;max-width:1200px;display:grid;grid-template-columns:1fr;justify-content:center;gap:20px;margin:auto;font-family:arial;.header{text-align:center}}.card[data-astro-cid-34s7mdjv],.logo[data-astro-cid-34s7mdjv]{width:300px;margin:auto;background:#f7f6f8}.card-header[data-astro-cid-34s7mdjv],#exportarPDF[data-astro-cid-34s7mdjv]{width:100%;background-color:#26a647;box-sizing:border-box;padding:15px;color:#fff;font-weight:700;border-radius:5px;border:none}.card-header[data-astro-cid-34s7mdjv]{border-radius:5px 5px 0 0}#exportarPDF[data-astro-cid-34s7mdjv]{cursor:pointer}.datos-vehiculo[data-astro-cid-34s7mdjv]{list-style:none;padding:0 15px;color:#262626}.datos-vehiculo[data-astro-cid-34s7mdjv] li[data-astro-cid-34s7mdjv]{padding:10px 0}@media print{.container-info[data-astro-cid-34s7mdjv]{display:none}}\n[data-astro-cid-sckkx6r4]{margin:0;padding:0;box-sizing:border-box}html,body{background-color:#fff;width:100%;height:100%}\n"}],"routeData":{"route":"/info","isIndex":false,"type":"page","pattern":"^\\/info\\/?$","segments":[[{"content":"info","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/info.astro","pathname":"/info","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/erickoficial69/projects/tramites/src/pages/create-person.astro",{"propagation":"none","containsHead":true}],["/home/erickoficial69/projects/tramites/src/pages/create-vehicle.astro",{"propagation":"none","containsHead":true}],["/home/erickoficial69/projects/tramites/src/pages/info.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/api/admin@_@ts":"pages/api/admin.astro.mjs","\u0000@astro-page:src/pages/api/personas@_@ts":"pages/api/personas.astro.mjs","\u0000@astro-page:src/pages/api/rcv@_@ts":"pages/api/rcv.astro.mjs","\u0000@astro-page:src/pages/api/vehiculos@_@ts":"pages/api/vehiculos.astro.mjs","\u0000@astro-page:src/pages/create-vehicle@_@astro":"pages/create-vehicle.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/create-person@_@astro":"pages/create-person.astro.mjs","\u0000@astro-page:src/pages/info@_@astro":"pages/info.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/home/erickoficial69/projects/tramites/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_9c8TXpPV.mjs","\u0000@astrojs-manifest":"manifest_Bwenn56o.mjs","/home/erickoficial69/projects/tramites/src/pages/info.astro?astro&type=script&index=0&lang.ts":"_astro/info.astro_astro_type_script_index_0_lang.CHJXte8Y.js","/home/erickoficial69/projects/tramites/src/pages/create-person.astro?astro&type=script&index=0&lang.ts":"_astro/create-person.astro_astro_type_script_index_0_lang.D_dT5mjN.js","/home/erickoficial69/projects/tramites/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BKROPguO.js","/home/erickoficial69/projects/tramites/src/pages/create-vehicle.astro?astro&type=script&index=0&lang.ts":"_astro/create-vehicle.astro_astro_type_script_index_0_lang.DCjO-a9p.js","/home/erickoficial69/projects/tramites/src/components/FormClient.astro?astro&type=script&index=0&lang.ts":"_astro/FormClient.astro_astro_type_script_index_0_lang.B1B3pozd.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/erickoficial69/projects/tramites/src/pages/info.astro?astro&type=script&index=0&lang.ts","const r=\"https://4321-cs-271764841471-default.cs-us-east1-yeah.cloudshell.dev/info\",a=new URLSearchParams(window.location.search),d=a.get(\"contrato\");document.addEventListener(\"DOMContentLoaded\",function(){const t=document.getElementById(\"qr-1\"),e=document.getElementById(\"qr-2\");document.getElementById(\"qr-2\");const n=document.getElementById(\"exportarPDF\"),c=document.getElementById(\"plantilla\");if(n&&c){const o={text:r+\"info?contrato=\"+d,width:100,height:100,colorDark:\"#000000\",colorLight:\"#ffffff\",correctLevel:QRCode.CorrectLevel.H};n.addEventListener(\"click\",async function(){t&&e&&(t.innerHTML=\"\",e.innerHTML=\"\"),await new QRCode(\"qr-1\",o),await new QRCode(\"qr-2\",o),setTimeout(()=>window.print(),1e3)})}});"],["/home/erickoficial69/projects/tramites/src/pages/index.astro?astro&type=script&index=0&lang.ts","await fetch(\"/api/rcv\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({data:\"test\"})});"],["/home/erickoficial69/projects/tramites/src/pages/create-vehicle.astro?astro&type=script&index=0&lang.ts","const h=async t=>{const e=await fetch(\"/api/rcv\",{method:\"POST\",body:JSON.stringify(t),headers:{\"Content-Type\":\"application/json\"}});return e.status===409?{message:\"duplicate\",status:409}:e.json()},b=async t=>{const e=await fetch(\"/api/vehiculos\",{method:\"POST\",body:JSON.stringify(t),headers:{\"Content-Type\":\"application/json\"}});if(e.status===409){const{vehiculo:a}=await e.json();return{message:\"duplicate\",status:409,vehiculo:a}}return e.status===500?{message:\"duplicate\",status:500}:e.json()},E=(t,e)=>{for(const a in t)if(t.hasOwnProperty(a)){const s=t[a],n=document.createElement(\"p\");n.innerHTML=`<b>${a}:</b> ${s}`,e.appendChild(n)}},j=document.getElementById(\"vehicleForm\"),y=document.getElementById(\"dni\"),c=document.getElementById(\"vehicle-section\"),o=document.createElement(\"button\");o.textContent=\"Seguir con este vehiculo\";j?.addEventListener(\"submit\",async t=>{t.preventDefault();const{marca:e,modelo:a,clase:s,anio:n,color:u,tipo:i,uso:v,placa:l,carroceria:d,motor:p,puestos_tonelaje:m}=t.target;if(!e.value||!a.value||!s.value||!n.value||!u.value||!i.value||!v.value||!l.value||!d.value||!p.value||!m.value)return alert(\"rellene todos los campos\");const f={marca:e.value,modelo:a.value,clase:s.value,anio:n.value,color:u.value,tipo:i.value,uso:v.value,placa:l.value,carroceria:d.value,motor:p.value,puestos_tonelaje:m.value},r=await b(f);if(r.status===409)return E(r.vehiculo,c),c.appendChild(o),c.style.display=\"block\",o.addEventListener(\"click\",async()=>{o.disabled=!0,o.textContent=\"Cargando...\";const{numeroContrato:C}=await h({placaVehiculo:l.value,personDNI:y?.textContent||\"\"});o.textContent=\"Seguir con este vehiculo\",o.disabled=!1,c.style.display=\"none\",o.remove(),document.location=\"/info?contrato=\"+C}),alert(\"El vehiculo ya existe\");if(r.status===500)return alert(\"Error del servidor\");const{numeroContrato:g}=await h({placaVehiculo:l.value,personDNI:y?.textContent||\"\"});document.location=\"/info?contrato=\"+g});"]],"assets":["/card-bg.jpg","/favicon.svg","/logo-plantilla.png","/qrcode.min.js","/script.js","/_astro/FormClient.astro_astro_type_script_index_0_lang.B1B3pozd.js","/_astro/create-person.astro_astro_type_script_index_0_lang.D_dT5mjN.js","/_astro/personas.controller.Wut-ibWp.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"0B7Pdaa0it1gB5mJYK4/eXJhxWk+mVW+5Q2ClD8a4k8="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
