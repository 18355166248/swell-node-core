import jiti from "file:///F:/FrontEnd/Code/swell-node-core/node_modules/.pnpm/jiti@1.20.0/node_modules/jiti/lib/index.js";

/** @type {import("F:/FrontEnd/Code/swell-node-core/src/utils/platform")} */
const _module = jiti(null, {
  "esmResolve": true,
  "interopDefault": true,
  "alias": {
    "swell-node-core": "F:/FrontEnd/Code/swell-node-core"
  }
})("F:/FrontEnd/Code/swell-node-core/src/utils/platform.ts");

export const getPlatform = _module.getPlatform;
export const getRightPath = _module.getRightPath;
export const getSlash = _module.getSlash;