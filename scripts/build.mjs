import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const version = "0.1.0";
const releaseRef = "integration-v0.1.0";
const outputDir = path.join(root, "dist", `v${version}`);
const releaseDir = path.join(root, "releases");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath));
}

function sha(buffer, algorithm, encoding = "hex") {
  return crypto.createHash(algorithm).update(buffer).digest(encoding);
}

function sri(buffer) {
  return `sha384-${sha(buffer, "sha384", "base64")}`;
}

function write(relativePath, content) {
  const target = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(releaseDir, { recursive: true });

const probeJs = read("src/betlora-v2-probe.js");
const probeCss = read("src/betlora-v2-probe.css");
const loaderTemplate = read("src/betlora-v2-loader.js").toString("utf8");

const loaderJs = Buffer.from(
  loaderTemplate
    .replace("__CSS_INTEGRITY__", sri(probeCss))
    .replace("__JS_INTEGRITY__", sri(probeJs)),
  "utf8",
);

write(`dist/v${version}/betlora-v2-probe.js`, probeJs);
write(`dist/v${version}/betlora-v2-probe.css`, probeCss);
write(`dist/v${version}/betlora-v2-loader.js`, loaderJs);

const panelTemplate = read("panel/betlora-v2-loader-test.html").toString("utf8");
const panelSnippet = panelTemplate.replace("__LOADER_INTEGRITY__", sri(loaderJs));
write(`dist/v${version}/panel-loader-snippet.html`, panelSnippet);

const files = [
  ["betlora-v2-loader.js", loaderJs],
  ["betlora-v2-probe.css", probeCss],
  ["betlora-v2-probe.js", probeJs],
].map(([name, content]) => ({
  name,
  bytes: content.length,
  sha256: sha(content, "sha256"),
  integrity: sri(content),
  url: `https://cdn.jsdelivr.net/gh/Marsel222/my-cdn@${releaseRef}/dist/v${version}/${name}`,
}));

const manifest = {
  version,
  releaseRef,
  releaseDate: "2026-11-11",
  environment: "test",
  allowedHostname: "test.betlora.com",
  status: "candidate",
  files,
  rollback: {
    panelRecord: "betlora-v2-loader-test",
    action: "Disable the standalone test loader record",
  },
};

write(`releases/v${version}.json`, `${JSON.stringify(manifest, null, 2)}\n`);
