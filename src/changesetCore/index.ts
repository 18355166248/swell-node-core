import chalk from "chalk";
import { spawn } from "child_process";
import { promisify } from "util";
import { exec as execCallback } from "child_process";
import { check_pnpm } from "../utils/check-env";
import { confirm, input } from "@inquirer/prompts";
import { errorLog } from "../utils/error";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const exec = promisify(execCallback);

export async function changesetPublish() {
  try {
    await changeset();
    const commitMessage = await generateCommitMessage();
    console.log("commitMessage", commitMessage);
    await changesetVersion();
    await _changesetPublish();
    await gitPush(commitMessage);
    console.log();
    console.log(chalk.green(" 🎉 publish success 🎉 "));
    console.log();
  } catch (error) {
    errorLog("Error in changeset publish process:", error);
    process.exit(1);
  }
}

export async function changesetPrereleasesPublish() {
  await changeset();
  const commitMessage = await generateCommitMessage();
  await changesetPrereleases();
  await changesetVersion();
  await changePreExit();
  await _changesetPublish();
  await gitPush(commitMessage);
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
          errorLog("Error executing changeset:", err);
          reject(err);
        });
      });
    } else {
      console.log(
        chalk.red("pnpm version is too low, please upgrade to 8.10.0 or higher")
      );
      process.exit(1);
    }
  } catch (error) {
    errorLog("Error executing changeset:", error);
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
        reject(err);
      });
    });
  } catch (error) {
    errorLog("Error executing changeset Prereleases:", error);
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
    errorLog("Error executing changeset version:", error);
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
    errorLog("Error executing changeset publish: ", error);
    throw error;
  }
}

// 退出预发布
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
    errorLog("Error executing changeset pre exit", error);
  }
}

// 从 .changeset 目录读取变更信息生成提交信息
async function generateCommitMessage(): Promise<string | null> {
  try {
    const changesetDir = join(process.cwd(), ".changeset");

    // 获取未提交的文件列表
    const { stdout: untrackedFiles } = await exec(
      "git ls-files --others --exclude-standard --full-name"
    );

    // 获取已修改但未提交的文件列表
    // const { stdout: modifiedFiles } = await exec("git diff --name-only");

    // 合并所有文件并过滤出 .changeset 目录下的 .md 文件（排除 README.md）
    const allFiles = [
      ...untrackedFiles.split("\n"),
      // ...modifiedFiles.split("\n"),
    ].filter(
      (file) =>
        file.startsWith(".changeset/") &&
        file.endsWith(".md") &&
        !file.endsWith("README.md")
    );

    if (allFiles.length === 0) {
      return null;
    }

    let message = "";

    for (const file of allFiles) {
      let content = readFileSync(join(process.cwd(), file), "utf-8");
      // 将文本中的所有换行符替换为空格
      // 将多个连续的空白字符替换为一个空格
      // 去掉字符串两端的空白字符
      content = content.replace(/\r?\n/g, " ").replace(/\s\s+/g, " ").trim();
      message += `${content}\n`;
    }

    return `chore(release): ${message.trim()}`;
  } catch (error) {
    errorLog("Error generating commit message:", error);
    return null;
  }
}

// 提交代码,并执行 git push
async function gitPush(message: string | null) {
  try {
    if (!message) {
      const answer = await input({
        message: "git commit message: ",
        required: true,
        transformer: (input) => input.trim(),
        validate: (input) => input.trim() !== "",
      });
      message = answer;
    }
    if (message.trim() === "") {
      errorLog("", "git commit message is empty");
      process.exit(1);
    }
    // 添加所有更改的文件
    await exec("git add .");

    console.log();
    console.log(chalk.green("git commit message: \n"), chalk.yellow(message));

    // 生成动态提交信息
    await exec(`git commit -m "${message}"`);

    // 获取当前分支名
    const { stdout: branchName } = await exec(
      "git rev-parse --abbrev-ref HEAD"
    );

    // 推送到远程仓库
    await exec(`git push origin ${branchName.trim()}`);

    console.log();
    console.log(chalk.green("✨ Git changes pushed successfully"));
    console.log();
  } catch (error) {
    errorLog("Error executing git operations:", error);
    throw error;
  }
}
