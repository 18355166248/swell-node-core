import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs/promises';
import { execSync } from 'node:child_process';
import Table from 'cli-table';
import path$1 from 'node:path';
import { generateApi, generateTemplates } from 'swagger-typescript-api';
import { execSync as execSync$1, spawn } from 'child_process';
import { confirm } from '@inquirer/prompts';

const deleteFolders = async (entries, name) => {
  let deletedFoldersCounter = 0;
  for (const entry of entries) {
    await fs.rm(entry, { recursive: true });
    deletedFoldersCounter++;
    process.stdout.write(
      `\r\u{1F5D1}  \u6B63\u5728\u5220\u9664 ${name} (${deletedFoldersCounter}/${entries.length})...`
    );
  }
};

async function findDirFolders(startPath, paths) {
  const results = [];
  async function findDirRecursive(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (hasPath(paths, entry.name)) {
          results.push(path.join(dir, entry.name));
        } else {
          await findDirRecursive(path.join(dir, entry.name));
        }
      }
    }
  }
  await findDirRecursive(startPath);
  return results;
}
function hasPath(paths, file) {
  if (Array.isArray(paths)) {
    return paths.includes(file);
  }
  return paths === file;
}

function getDirectorySize(dirPath) {
  try {
    const sizeInBlocks = parseInt(
      execSync(`du -s "${dirPath}" | cut -f1`).toString().trim(),
      10
    );
    const sizeInBytes = sizeInBlocks * 512;
    return sizeInBytes;
  } catch (err) {
    console.error(`\u83B7\u53D6\u6587\u4EF6\u5939\u5927\u5C0F\u5931\u8D25 ${dirPath}:`, err);
    return 0;
  }
}

const calculateSizeDirs = ({
  dirs
}) => {
  const entires = [];
  let totalSize = 0;
  for (const dir of dirs) {
    const dirSize = getDirectorySize(dir);
    totalSize += dirSize;
    entires.push({
      path: dir,
      size: dirSize
    });
  }
  return {
    entires,
    totalSize
  };
};

const proportion = 1024;
function unitsFormatter(bytes) {
  const megaBytes = bytes / (proportion * proportion);
  if (megaBytes < proportion) {
    return `${megaBytes.toFixed(2)}MB`;
  }
  const gigaBytes = megaBytes / proportion;
  return `${gigaBytes.toFixed(2)}GB`;
}

function generateTable({
  entires,
  totalSize
}) {
  var table = new Table({
    head: ["\u8DEF\u5F84", "\u5927\u5C0F"],
    colWidths: [100, 15],
    style: {
      head: ["green", "bold"]
    }
  });
  entires.map((v) => table.push([v.path, unitsFormatter(v.size)]));
  table.push(["\u603B\u5927\u5C0F", unitsFormatter(totalSize)]);
  console.log("\r");
  console.log(table.toString());
  console.log();
}

const cwd = process.cwd();
const dirName = path.resolve(cwd);
async function rmDir(name = "node_modules") {
  const spinner = ora(`\u5220\u9664 ${name} \u4E2D`).start();
  try {
    const dirs = await findDirFolders(dirName, name);
    if (dirs.length === 0) {
      console.log(chalk.yellow(`\r\u{1F616} ${dirName} \u4E0D\u5B58\u5728 ${name}`));
      process.exit();
    }
    const { entires, totalSize } = calculateSizeDirs({ dirs });
    await deleteFolders(dirs, name);
    await setTimeout(() => {
      spinner.succeed(chalk.green("\u5220\u9664\u6210\u529F"));
      generateTable({ entires, totalSize });
    }, 500);
  } catch (error) {
    spinner.fail(`${chalk.red("\u5220\u9664\u5931\u8D25 => ")}${chalk.redBright(error)}`);
  } finally {
    spinner.stop();
  }
}

const index$2 = {
  __proto__: null,
  rmDir: rmDir
};

const outputDir = path$1.resolve(process.cwd(), "./src/swaggerToTs/api");
function swaggerToTs() {
  generateApi({
    // input: path.resolve(__dirname, "./schemas.json"),
    // url: swaggerUrl,
    input: path$1.resolve(process.cwd(), "./src/swaggerToTs/swagger.json"),
    output: outputDir,
    modular: true,
    templates: path$1.resolve(process.cwd(), "./src/swaggerToTs/templates"),
    httpClientType: "axios",
    // or "fetch"
    generateRouteTypes: true
  });
}
function beforeInit() {
  const PATH_TO_OUTPUT_DIR = path$1.resolve(
    process.cwd(),
    "./src/swaggerToTs/templates"
  );
  generateTemplates({
    output: PATH_TO_OUTPUT_DIR,
    httpClientType: "fetch",
    modular: true,
    silent: false
  });
}

const index$1 = {
  __proto__: null,
  beforeInit: beforeInit,
  swaggerToTs: swaggerToTs
};

function check_pnpm() {
  try {
    const versionBuffer = execSync$1("pnpm -v");
    const version = versionBuffer.toString();
    return version;
  } catch (error) {
    console.error(chalk.red("Error executing pnpm -v"), error);
    throw error;
  }
}

async function changesetPublish() {
  await changeset();
  await changesetVersion();
  await _changesetPublish();
  console.log();
  console.log(chalk.green(" \u{1F389} publish success \u{1F389} "));
  console.log();
}
async function changesetPrereleasesPublish() {
  await changeset();
  await changesetPrereleases();
  await changesetVersion();
  await changePreExit();
  await _changesetPublish();
  console.log();
  console.log(chalk.green(" \u{1F389} prereleases publish success \u{1F389} "));
  console.log();
}
async function changeset() {
  try {
    const version = check_pnpm();
    if (version) {
      const changesetProcess = spawn("pnpm", ["changeset"], {
        stdio: "inherit",
        // 这会将子进程的 stdio 直接连接到父进程
        shell: true
      });
      return new Promise((resolve, reject) => {
        changesetProcess.on("close", (code) => {
          if (code === 0) {
            resolve(void 0);
          } else {
            reject(new Error(`Changeset process exited with code ${code}`));
          }
        });
        changesetProcess.on("error", (err) => {
          console.log("\u{1F680} ~ changesetProcess.on ~ err:", err);
          reject(err);
        });
      });
    } else {
      console.log(
        chalk.red("pnpm version is too low, please upgrade to 8.10.0 or higher")
      );
    }
  } catch (error) {
    console.error(chalk.red("Error executing changeset:"), error);
    throw error;
  }
}
async function changesetPrereleases() {
  try {
    const changesetPrereleasesProcess = spawn(
      "pnpm",
      ["changeset", "pre", "enter", "alpha"],
      {
        stdio: "inherit",
        // 这会将子进程的 stdio 直接连接到父进程
        shell: true
      }
    );
    return new Promise((resolve, reject) => {
      changesetPrereleasesProcess.on("close", (code) => {
        if (code === 0) {
          resolve(void 0);
        } else {
          reject(
            new Error(`Changeset Prereleases process exited with code ${code}`)
          );
        }
      });
      changesetPrereleasesProcess.on("error", (err) => {
        console.log("\u{1F680} ~ Changeset Prereleases process.on ~ err:", err);
        reject(err);
      });
    });
  } catch (error) {
    console.error(chalk.red("Error executing changeset Prereleases:"), error);
    throw error;
  }
}
async function changesetVersion() {
  try {
    console.log();
    console.log(chalk.green("changeset version start"));
    console.log();
    const changesetVersionProcess = spawn("pnpm", ["changeset", "version"], {
      stdio: "inherit",
      // 这会将子进程的 stdio 直接连接到父进程
      shell: true
    });
    return new Promise((resolve, reject) => {
      changesetVersionProcess.on("close", (code) => {
        if (code === 0) {
          resolve(void 0);
        } else {
          reject(
            new Error(`Changeset version process exited with code ${code}`)
          );
        }
      });
      changesetVersionProcess.on("error", (err) => {
        reject(err);
      });
    });
  } catch (error) {
    console.error(chalk.red("Error executing changeset version:"), error);
    throw error;
  }
}
async function _changesetPublish() {
  try {
    console.log();
    const answer = await confirm({ message: "changeset publish?" });
    if (answer === false) {
      console.log();
      console.log(chalk.redBright("changeset publish cancel"));
      console.log();
      process.exit(0);
    }
    console.log();
    console.log(chalk.green("changeset publish start"));
    console.log();
    const changesetPublishProcess = spawn("pnpm", ["changeset", "publish"], {
      stdio: "inherit",
      // 这会将子进程的 stdio 直接连接到父进程
      shell: true
    });
    return new Promise((resolve, reject) => {
      changesetPublishProcess.on("close", (code) => {
        if (code === 0) {
          resolve(void 0);
        } else {
          reject(
            new Error(`Changeset publish process exited with code ${code}`)
          );
        }
      });
      changesetPublishProcess.on("error", (err) => {
        reject(err);
      });
    });
  } catch (error) {
    console.error(chalk.red("Error executing changeset publish:"), error);
    throw error;
  }
}
async function changePreExit() {
  try {
    const changesetVersionProcess = spawn(
      "pnpm",
      ["changeset", "pre", "exit"],
      {
        stdio: "inherit",
        // 这会将子进程的 stdio 直接连接到父进程
        shell: true
      }
    );
    return new Promise((resolve, reject) => {
      changesetVersionProcess.on("close", (code) => {
        if (code === 0) {
          resolve(void 0);
        } else {
          reject(
            new Error(`Changeset pre exit process exited with code ${code}`)
          );
        }
      });
      changesetVersionProcess.on("error", (err) => {
        reject(err);
      });
    });
  } catch (error) {
    console.error(chalk.red("Error executing changeset pre exit"), error);
  }
}

const index = {
  __proto__: null,
  changesetPrereleasesPublish: changesetPrereleasesPublish,
  changesetPublish: changesetPublish
};

export { changesetPublish as a, index$1 as b, changesetPrereleasesPublish as c, index as d, index$2 as i, rmDir as r, swaggerToTs as s };
