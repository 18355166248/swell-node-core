import chalk from "chalk";
import { execSync } from "child_process";

export function check_pnpm() {
  try {
    const versionBuffer = execSync("pnpm -v");
    const version = versionBuffer.toString();

    return version;
  } catch (error) {
    console.error(chalk.red("Error executing pnpm -v"), error);
    throw error;
  }
}
