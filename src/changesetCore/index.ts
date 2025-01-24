import chalk from "chalk";
import { spawn } from "child_process";
import { check_pnpm } from "../utils/check-env";
import { confirm } from "@inquirer/prompts";

export async function changesetPublish() {
  await changeset();
  await changesetVersion();
  await _changesetPublish();
  console.log();
  console.log(chalk.green(" 🎉 publish success 🎉 "));
  console.log();
}

export async function changesetPrereleasesPublish() {
  await changeset();
  await changesetPrereleases();
  await changesetVersion();
  await changePreExit();
  await _changesetPublish();
  console.log();
  console.log(chalk.green(" 🎉 prereleases publish success 🎉 "));
  console.log();
}

// 初始化哪些项目需要更新哪种版本, 初始化后会在 .changeset 下生成文件, 可以修改
async function changeset() {
  try {
    const version = check_pnpm();

    if (version) {
      // 使用 spawn 来运行 changeset 命令，并保持输入输出流
      const changesetProcess = spawn("pnpm", ["changeset"], {
        stdio: "inherit", // 这会将子进程的 stdio 直接连接到父进程
        shell: true,
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
          console.log("🚀 ~ changesetProcess.on ~ err:", err);
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

// 预发布配置
async function changesetPrereleases() {
  try {
    const changesetPrereleasesProcess = spawn(
      "pnpm",
      ["changeset", "pre", "enter", "alpha"],
      {
        stdio: "inherit", // 这会将子进程的 stdio 直接连接到父进程
        shell: true,
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
        console.log("🚀 ~ Changeset Prereleases process.on ~ err:", err);
        reject(err);
      });
    });
  } catch (error) {
    console.error(chalk.red("Error executing changeset Prereleases:"), error);
    throw error;
  }
}

// 基于初始化的配置, 针对不同的包生成约定好的版本号
async function changesetVersion() {
  try {
    console.log();
    console.log(chalk.green("changeset version start"));
    console.log();

    const changesetVersionProcess = spawn("pnpm", ["changeset", "version"], {
      stdio: "inherit", // 这会将子进程的 stdio 直接连接到父进程
      shell: true,
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

// 动态拉取每个包, 比较线上和当前包的版本号是否相同, 如果高于的话, 触发 npm publish
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
      stdio: "inherit", // 这会将子进程的 stdio 直接连接到父进程
      shell: true,
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
        stdio: "inherit", // 这会将子进程的 stdio 直接连接到父进程
        shell: true,
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
