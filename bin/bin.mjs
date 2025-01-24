#!/usr/bin/env node
import jiti from "file:///Users/xmly/Swell/code/swell-node-core/node_modules/.pnpm/jiti@1.20.0/node_modules/jiti/lib/index.js";

/** @type {import("/Users/xmly/Swell/code/swell-node-core/src/bin")} */
const _module = jiti(null, {
  "esmResolve": true,
  "interopDefault": true,
  "alias": {
    "swell-node-core": "/Users/xmly/Swell/code/swell-node-core"
  }
})("/Users/xmly/Swell/code/swell-node-core/src/bin.ts");

export default _module;