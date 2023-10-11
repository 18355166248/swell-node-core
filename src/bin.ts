#!/usr/bin/env node

import { Command } from "commander"; // 命令行工具
import { version } from "../package.json";
import { rmDir } from "./rm";
import chalk from "chalk";

const program = new Command();

// 修改帮助信息的首行提示
program.version(version, "-v, --version,").usage("<command> [options]");

// 输入megalo显示帮助信息 ( 当不输入或者输入 --help 显示帮助信息 )
if (!process.argv.slice(2).length || process.argv.slice(2)[0] === "--help") {
  program.outputHelp();
}

// 配置批量删除文件夹命令
program
  .command("rm [dir-name]")
  .description("删除文件夹下所有的文件夹( 默认是 node_modules )")
  .action((dirName, cmd) => {
    // 输入参数校验
    validateArgsLen(process.argv.length, 4);
    rmDir(dirName);
  });

// 把命令行参数提供给 commander 解析
program.parse(process.argv);

function validateArgsLen (argLen: number, MaxArgLength: number) {
  if (argLen > MaxArgLength) {
    console.log(chalk.yellow("\n 提示: 参数超过期望长度, 多余参数自动忽略"));
  }
}
