import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../src/betlora-v2-probe.js", import.meta.url), "utf8");
const css = fs.readFileSync(new URL("../src/betlora-v2-probe.css", import.meta.url), "utf8");
const loader = fs.readFileSync(new URL("../src/betlora-v2-loader.js", import.meta.url), "utf8");

class FakeElement {
  constructor(tagName, document) {
    this.tagName = tagName.toUpperCase();
    this.ownerDocument = document;
    this.children = [];
    this.attributes = {};
    this.id = "";
    this.className = "";
    this.textContent = "";
    this.parentNode = null;
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  remove() {
    if (!this.parentNode) return;
    this.parentNode.children = this.parentNode.children.filter((child) => child !== this);
    this.parentNode = null;
  }
}

function createRuntime(hostname) {
  const listeners = new Map();
  const document = {
    readyState: "complete",
    body: null,
    createElement(tagName) {
      return new FakeElement(tagName, document);
    },
    getElementById(id) {
      function find(node) {
        if (!node) return null;
        if (node.id === id) return node;
        for (const child of node.children || []) {
          const match = find(child);
          if (match) return match;
        }
        return null;
      }
      return find(document.body);
    },
    querySelectorAll(selector) {
      return selector.startsWith("#") && document.getElementById(selector.slice(1))
        ? [document.getElementById(selector.slice(1))]
        : [];
    },
    addEventListener() {},
    removeEventListener() {},
  };
  document.body = new FakeElement("body", document);

  const context = {
    CustomEvent: class CustomEvent {
      constructor(type) {
        this.type = type;
      }
    },
    document,
    history: {
      pushState() {},
      replaceState() {},
    },
    location: { hostname },
    navigation: null,
    setTimeout(callback) {
      callback();
      return 1;
    },
    addEventListener(type, handler) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(handler);
    },
    removeEventListener(type, handler) {
      listeners.get(type)?.delete(handler);
    },
    dispatchEvent(event) {
      listeners.get(event.type)?.forEach((handler) => handler(event));
    },
  };
  context.window = context;
  return context;
}

test("probe refuses every hostname except the verified test host", () => {
  const context = createRuntime("betlora305.com");
  vm.runInNewContext(source, context);
  assert.equal(context.document.body.children.length, 0);
  assert.equal(context.BetloraV2Probe, undefined);
});

test("probe is a singleton and can be removed in one call", () => {
  const context = createRuntime("test.betlora.com");
  vm.runInNewContext(source, context);
  vm.runInNewContext(source, context);
  assert.equal(context.document.body.children.length, 1);
  assert.equal(context.BetloraV2Probe.diagnostics().count, 1);
  context.BetloraV2Probe.unmount();
  assert.equal(context.document.body.children.length, 0);
});

test("client-side route transitions remount once without duplicates", () => {
  const context = createRuntime("test.betlora.com");
  vm.runInNewContext(source, context);

  for (let index = 0; index < 20; index += 1) {
    context.history.pushState({}, "", `/tr/route-${index}`);
  }

  assert.equal(context.document.body.children.length, 1);
  assert.equal(context.BetloraV2Probe.diagnostics().count, 1);

  context.document.getElementById("betlora-v2-integration-probe").remove();
  context.history.replaceState({}, "", "/tr");
  assert.equal(context.document.body.children.length, 1);
});

test("probe does not install a MutationObserver or accept pointer input", () => {
  assert.equal(source.includes("MutationObserver"), false);
  assert.match(css, /pointer-events:\s*none/);
});

test("loader pins the exact test hostname and exposes rollback", () => {
  assert.match(loader, /hostname:\s*"test\.betlora\.com"/);
  assert.match(loader, /rollback:\s*rollback/);
  assert.match(loader, /integration-v0\.1\.0/);
});
