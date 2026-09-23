import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.dirname(scriptDirectory);
const siteDirectory = path.join(projectDirectory, "site");
const workerDirectory = path.join(siteDirectory, "assets", "javascripts", "workers");
const workerName = fs.readdirSync(workerDirectory)
  .find(name => /^search\..+\.min\.js$/.test(name));

assert.ok(workerName, "built search worker is missing");

const workerPath = path.join(workerDirectory, workerName);
const searchData = JSON.parse(fs.readFileSync(
  path.join(siteDirectory, "search", "search_index.json"), "utf8"
));

let listener;
let receive;
globalThis.self = globalThis;
globalThis.addEventListener = (type, callback) => {
  if (type === "message") listener = callback;
};
globalThis.postMessage = message => receive?.(message);
globalThis.importScripts = (...urls) => {
  for (const url of urls) {
    const filename = path.resolve(workerDirectory, url);
    vm.runInThisContext(fs.readFileSync(filename, "utf8"), { filename });
  }
};

vm.runInThisContext(fs.readFileSync(workerPath, "utf8"), { filename: workerPath });
assert.equal(typeof listener, "function", "search worker did not register a message listener");

function send(message) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("search worker timed out")), 10000);
    receive = response => {
      clearTimeout(timeout);
      resolve(response);
    };
    Promise.resolve(listener({ data: message })).catch(reject);
  });
}

async function setup(config = {}) {
  const response = await send({
    type: 0,
    data: {
      config: { ...searchData.config, ...config },
      docs: searchData.docs,
      options: { suggest: true }
    }
  });
  assert.equal(response.type, 1, "search worker did not become ready");
}

async function search(query) {
  const response = await send({ type: 2, data: query });
  assert.equal(response.type, 3, `search worker rejected ${query}`);
  return response.data.items
    .flat()
    .filter(item => item.score > 0)
    .map(item => ({ title: item.title, location: item.location, score: item.score }));
}

const queries = [
  "functional",
  "function",
  "functionals",
  "homomorphism",
  "Haar",
  "集合",
  "同态",
  "紧致"
];

const compare = process.argv.includes("--compare");
const variants = compare
  ? [
      ["current", {}],
      ["english-first", { lang: ["en", "zh"] }],
      ["no-pipeline", { pipeline: [] }],
      ["full-pipeline", { pipeline: ["stemmer", "stopWordFilter", "trimmer"] }],
      ["broad-separator", { separator: String.raw`[\s\u200b\u3000\-、。，．？！；,:!=\[\]()"/]+|(?!\b)(?=[A-Z][a-z])|\.(?!\d)|&[lg]t;` }]
    ]
  : [["current", {}]];

for (const [name, config] of variants) {
  await setup(config);
  const counts = {};
  for (const query of queries)
    counts[query] = (await search(query)).length;
  if (compare) {
    console.log(JSON.stringify({ name, counts }, null, 2));
  } else {
    assert.ok(counts.functional >= 5, "functional must find its indexed occurrences");
    assert.ok(counts.functionals >= 1, "plural mathematical terms must remain searchable");
    assert.ok(counts.homomorphism >= 10, "homomorphism must find chapter content");
    assert.ok(counts.Haar >= 1, "search must be case-insensitive");
    assert.ok(counts["集合"] >= 1, "Chinese mathematical nouns must remain searchable");
    assert.ok(counts["同态"] >= 1, "Chinese mathematical terms must remain searchable");
    assert.ok(counts["紧致"] >= 1, "Chinese prefix search must remain available");
    console.log(`search regression checks passed: ${JSON.stringify(counts)}`);
  }
}
