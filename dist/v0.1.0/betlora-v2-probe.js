(function (global) {
  "use strict";

  var VERSION = "0.1.0";
  var ALLOWED_HOSTNAME = "test.betlora.com";
  var ROOT_ID = "betlora-v2-integration-probe";
  var API_KEY = "BetloraV2Probe";
  var ROUTE_EVENT = "betlora:v2:locationchange";
  var scheduled = false;
  var cleanupCallbacks = [];

  if (!global.location || global.location.hostname !== ALLOWED_HOSTNAME) {
    return;
  }

  if (global[API_KEY] && global[API_KEY].version === VERSION) {
    global[API_KEY].mount();
    return;
  }

  function createLabel() {
    var root = global.document.createElement("aside");
    root.id = ROOT_ID;
    root.className = "betlora-v2-probe";
    root.setAttribute("data-betlora-v2-probe", VERSION);
    root.setAttribute("role", "status");
    root.setAttribute("aria-label", "Betlora V2 test entegrasyonu sürüm " + VERSION);

    var dot = global.document.createElement("span");
    dot.className = "betlora-v2-probe__dot";
    dot.setAttribute("aria-hidden", "true");

    var text = global.document.createElement("span");
    text.className = "betlora-v2-probe__text";
    text.textContent = "BETLORA V2 TEST";

    var version = global.document.createElement("span");
    version.className = "betlora-v2-probe__version";
    version.textContent = "v" + VERSION;

    root.appendChild(dot);
    root.appendChild(text);
    root.appendChild(version);
    return root;
  }

  function mount() {
    var existing = global.document.getElementById(ROOT_ID);
    if (existing) return existing;
    if (!global.document.body) return null;
    var root = createLabel();
    global.document.body.appendChild(root);
    return root;
  }

  function scheduleMount() {
    if (scheduled) return;
    scheduled = true;
    global.setTimeout(function () {
      scheduled = false;
      mount();
    }, 0);
  }

  function listen(target, type, handler) {
    if (!target || !target.addEventListener) return;
    target.addEventListener(type, handler);
    cleanupCallbacks.push(function () {
      target.removeEventListener(type, handler);
    });
  }

  function installRouteHooks() {
    listen(global, "pageshow", scheduleMount);
    listen(global, "popstate", scheduleMount);
    listen(global, "hashchange", scheduleMount);
    listen(global, ROUTE_EVENT, scheduleMount);

    if (global.navigation && global.navigation.addEventListener) {
      listen(global.navigation, "navigatesuccess", scheduleMount);
      return;
    }

    ["pushState", "replaceState"].forEach(function (method) {
      var original = global.history && global.history[method];
      if (typeof original !== "function" || original.__betloraV2Wrapped) return;

      function wrappedHistory() {
        var result = original.apply(this, arguments);
        global.dispatchEvent(new global.CustomEvent(ROUTE_EVENT));
        return result;
      }

      wrappedHistory.__betloraV2Wrapped = true;
      wrappedHistory.__betloraV2Original = original;
      global.history[method] = wrappedHistory;
      cleanupCallbacks.push(function () {
        if (global.history[method] === wrappedHistory) {
          global.history[method] = original;
        }
      });
    });
  }

  function unmount() {
    var root = global.document.getElementById(ROOT_ID);
    if (root) root.remove();
    cleanupCallbacks.splice(0).forEach(function (cleanup) {
      cleanup();
    });
    delete global[API_KEY];
  }

  global[API_KEY] = {
    version: VERSION,
    hostname: ALLOWED_HOSTNAME,
    mount: mount,
    unmount: unmount,
    diagnostics: function () {
      return {
        version: VERSION,
        hostname: global.location.hostname,
        mounted: Boolean(global.document.getElementById(ROOT_ID)),
        count: global.document.querySelectorAll
          ? global.document.querySelectorAll("#" + ROOT_ID).length
          : Number(Boolean(global.document.getElementById(ROOT_ID))),
      };
    },
  };

  installRouteHooks();
  if (global.document.readyState === "loading") {
    listen(global.document, "DOMContentLoaded", mount);
  } else {
    mount();
  }
})(window);
