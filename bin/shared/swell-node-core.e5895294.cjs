'use strict';

const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const fs = require('fs/promises');
const node_child_process = require('node:child_process');
const Table = require('cli-table');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const chalk__default = /*#__PURE__*/_interopDefaultCompat(chalk);
const ora__default = /*#__PURE__*/_interopDefaultCompat(ora);
const path__default = /*#__PURE__*/_interopDefaultCompat(path);
const fs__default = /*#__PURE__*/_interopDefaultCompat(fs);
const Table__default = /*#__PURE__*/_interopDefaultCompat(Table);

const deleteFolders = async (entries, name) => {
  let deletedFoldersCounter = 0;
  for (const entry of entries) {
    await fs__default.rm(entry, { recursive: true });
    deletedFoldersCounter++;
    process.stdout.write(
      `\r\u{1F5D1}  \u6B63\u5728\u5220\u9664 ${name} (${deletedFoldersCounter}/${entries.length})...`
    );
  }
};

async function findDirFolders(startPath, paths) {
  const results = [];
  async function findDirRecursive(dir) {
    const entries = await fs__default.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (hasPath(paths, entry.name)) {
          results.push(path__default.join(dir, entry.name));
        } else {
          await findDirRecursive(path__default.join(dir, entry.name));
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
      node_child_process.execSync(`du -s "${dirPath}" | cut -f1`).toString().trim(),
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
  var table = new Table__default({
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
const dirName = path__default.resolve(cwd);
async function rmDir(name = "node_modules") {
  const spinner = ora__default(`\u5220\u9664 ${name} \u4E2D`).start();
  try {
    const dirs = await findDirFolders(dirName, name);
    if (dirs.length === 0) {
      console.log(chalk__default.yellow(`\r\u{1F616} ${dirName} \u4E0D\u5B58\u5728 ${name}`));
      process.exit();
    }
    const { entires, totalSize } = calculateSizeDirs({ dirs });
    await deleteFolders(dirs, name);
    await setTimeout(() => {
      spinner.succeed(chalk__default.green("\u5220\u9664\u6210\u529F"));
      generateTable({ entires, totalSize });
    }, 500);
  } catch (error) {
    spinner.fail(`${chalk__default.red("\u5220\u9664\u5931\u8D25 => ")}${chalk__default.redBright(error)}`);
  } finally {
    spinner.stop();
  }
}

const index = {
  __proto__: null,
  rmDir: rmDir
};

exports.index = index;
exports.rmDir = rmDir;
