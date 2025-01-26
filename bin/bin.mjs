#!/usr/bin/env node
import { Command } from 'commander';
import { r as rmDir, s as swaggerToTs, c as changesetPrereleasesPublish, a as changesetPublish } from './shared/swell-node-core.ae97258f.mjs';
import chalk from 'chalk';
import 'ora';
import 'path';
import 'fs/promises';
import 'node:child_process';
import 'cli-table';
import 'node:path';
import 'swagger-typescript-api';
import 'child_process';
import 'util';
import '@inquirer/prompts';
import 'fs';

const version = "1.9.2";

const program = new Command();
program.version(version, "-v, --version,").usage("<command> [options]");
if (!process.argv.slice(2).length || process.argv.slice(2)[0] === "--help") {
  program.outputHelp();
}
program.command("rm [dir-name]").description("\u5220\u9664\u6587\u4EF6\u5939\u4E0B\u6240\u6709\u7684\u6587\u4EF6\u5939( \u9ED8\u8BA4\u662F node_modules )").action((dirName, cmd) => {
  validateArgsLen(process.argv.length, 4);
  rmDir(dirName);
});
program.command("stt").description("swaggerToTs").action((dirName, cmd) => {
  swaggerToTs();
});
program.command("cp").description("changesetPublish").action((dirName, cmd) => {
  const args = cmd.args;
  if (args.length > 0 && args[0] === "pre") {
    changesetPrereleasesPublish();
  } else {
    changesetPublish();
  }
});
program.parse(process.argv);
function validateArgsLen(argLen, MaxArgLength) {
  if (argLen > MaxArgLength) {
    console.log(chalk.yellow("\n \u63D0\u793A: \u53C2\u6570\u8D85\u8FC7\u671F\u671B\u957F\u5EA6, \u591A\u4F59\u53C2\u6570\u81EA\u52A8\u5FFD\u7565"));
  }
}
