import path from "node:path";
import { generateApi, generateTemplates } from "swagger-typescript-api";

const outputDir = path.resolve(process.cwd(), "./src/swaggerToTs/api");

export function swaggerToTs() {
  generateApi({
    // input: path.resolve(__dirname, "./schemas.json"),
    // url: swaggerUrl,
    input: path.resolve(process.cwd(), "./src/swaggerToTs/swagger.json"),
    output: outputDir,
    modular: true,
    templates: path.resolve(process.cwd(), "./src/swaggerToTs/templates"),
    httpClientType: "axios", // or "fetch"
    generateRouteTypes: true,
  });
}

export function beforeInit() {
  const PATH_TO_OUTPUT_DIR = path.resolve(
    process.cwd(),
    "./src/swaggerToTs/templates"
  );
  generateTemplates({
    output: PATH_TO_OUTPUT_DIR,
    httpClientType: "fetch",
    modular: true,
    silent: false,
  });
}
