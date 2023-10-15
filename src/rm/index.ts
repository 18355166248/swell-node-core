import chalk from "chalk";
import ora from "ora";
import path from "path";
import { deleteFolders } from "./utils/deleteFolders";
import { findDirFolders } from "./utils/findDirFolders";
import { calculateSizeDirs } from "./utils/calculateSizeDirs";
import { generateTable } from "./utils/generateTable";

// 获取node进程的工种目录
const cwd = process.cwd();
const dirName = path.resolve(cwd);

export async function rmDir (name = "node_modules") {
  const spinner = ora(`删除 ${name} 中`).start();

  try {
    // 递归查询所有符合标准的文件夹路径
    const dirs = await findDirFolders(dirName, name);

    if (dirs.length === 0) {
      console.log(chalk.yellow(`\r😖 ${dirName} 不存在 ${name}`));
      process.exit();
    }

    // 查询需要删除的文件夹大小和总大小
    const { entires, totalSize } = calculateSizeDirs({ dirs });
    // 异步执行删除文件夹
    await deleteFolders(dirs, name);

    await setTimeout(() => {
      spinner.succeed(chalk.green("删除成功"));
      // 基于需要删除的文件夹大小和总大小生成表格
      generateTable({ entires, totalSize });
    }, 500);
  } catch (error) {
    spinner.fail(`${chalk.red("删除失败 => ")}${chalk.redBright(error)}`);
  } finally {
    spinner.stop();
  }
}
