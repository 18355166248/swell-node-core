import chalk from "chalk";

export function errorLog(prefix = "Error: ", error: unknown) {
  console.error(
    chalk.red(prefix),
    error instanceof Error ? error.message : String(error)
  );
}
