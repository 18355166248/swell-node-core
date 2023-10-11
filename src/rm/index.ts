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

export async function rmDir(name = "node_modules") {
  const spinner = ora(`删除 ${name} 中`).start();

  try {
    const dirs = await findDirFolders(dirName, name);

    if (dirs.length === 0) {
      console.log(chalk.yellow(`\r😖 ${dirName} 不存在 ${name}`));
      process.exit();
    }

    const { entires, totalSize } = calculateSizeDirs({ dirs });

    await deleteFolders(dirs, name);

    await setTimeout(() => {
      spinner.succeed(chalk.green("删除成功"));
      generateTable({ entires, totalSize });
    }, 500);
  } catch (error) {
    spinner.fail(`${chalk.red("删除失败 => ")}${chalk.redBright(error)}`);
  } finally {
    spinner.stop();
  }
}
