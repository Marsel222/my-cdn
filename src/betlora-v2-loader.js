(function (global) {
  "use strict";

  var CONFIG = {
    version: "0.1.0",
    hostname: "test.betlora.com",
    baseUrl: "https://cdn.jsdelivr.net/gh/Marsel222/my-cdn@integration-v0.1.0/dist/v0.1.0/",
    css: {
      id: "betlora-v2-probe-css",
      file: "betlora-v2-probe.css",
      integrity: "__CSS_INTEGRITY__",
    },
    js: {
      id: "betlora-v2-probe-js",
      file: "betlora-v2-probe.js",
      integrity: "__JS_INTEGRITY__",
    },
  };
  var API_KEY = "BetloraV2Integration";

  if (!global.location || global.location.hostname !== CONFIG.hostname) {
    return;
  }

  if (global[API_KEY] && global[API_KEY].version === CONFIG.version) {
    global[API_KEY].mount();
    return;
  }

  function assetUrl(file) {
    return CONFIG.baseUrl + file;
  }

  function ensureStylesheet() {
    var existing = global.document.getElementById(CONFIG.css.id);
    if (existing) return existing;
    var link = global.document.createElement("link");
    link.id = CONFIG.css.id;
    link.rel = "stylesheet";
    link.href = assetUrl(CONFIG.css.file);
    link.crossOrigin = "anonymous";
    link.integrity = CONFIG.css.integrity;
    link.setAttribute("data-betlora-v2-version", CONFIG.version);
    global.document.head.appendChild(link);
    return link;
  }

  function ensureScript() {
    var existing = global.document.getElementById(CONFIG.js.id);
    if (existing) return existing;
    var script = global.document.createElement("script");
    script.id = CONFIG.js.id;
    script.src = assetUrl(CONFIG.js.file);
    script.async = true;
    script.crossOrigin = "anonymous";
    script.integrity = CONFIG.js.integrity;
    script.setAttribute("data-betlora-v2-version", CONFIG.version);
    global.document.head.appendChild(script);
    return script;
  }

  function mount() {
    ensureStylesheet();
    ensureScript();
    if (global.BetloraV2Probe) global.BetloraV2Probe.mount();
  }

  function rollback() {
    if (global.BetloraV2Probe) global.BetloraV2Probe.unmount();
    [CONFIG.js.id, CONFIG.css.id].forEach(function (id) {
      var node = global.document.getElementById(id);
      if (node) node.remove();
    });
  }

  global[API_KEY] = {
    version: CONFIG.version,
    hostname: CONFIG.hostname,
    config: CONFIG,
    mount: mount,
    rollback: rollback,
    diagnostics: function () {
      return {
        version: CONFIG.version,
        hostname: global.location.hostname,
        cssLoaded: Boolean(global.document.getElementById(CONFIG.css.id)),
        jsLoaded: Boolean(global.document.getElementById(CONFIG.js.id)),
        probe: global.BetloraV2Probe ? global.BetloraV2Probe.diagnostics() : null,
      };
    },
  };

  mount();
})(window);
