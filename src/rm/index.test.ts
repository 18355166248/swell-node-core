import { rmDir } from ".";
import chalk from "chalk";
import { findDirFolders } from "./utils/findDirFolders";
import path from "path";
import { calculateSizeDirs } from "./utils/calculateSizeDirs";
import { deleteFolders } from "./utils/deleteFolders";
import { generateTable } from "./utils/generateTable";

// 获取node进程的工种目录
const cwd = process.cwd();
const dirName = path.resolve(cwd);

jest.mock("fs/promises", () => {
  return {
    rm: jest.fn(),
  };
});
jest.mock("chalk", () => ({
  yellow: jest.fn(),
  redBright: jest.fn(),
  green: jest.fn(),
  red: jest.fn(),
}));
jest.mock("ora", () => () => ({
  start: () => ({
    succeed: () => "",
    fail: () => "",
    stop: () => "",
  }),
}));
jest.mock("./utils/deleteFolders");
jest.mock("./utils/findDirFolders");
jest.mock("./utils/calculateSizeDirs");
jest.mock("./utils/generateTable");

describe("swell-node-core rm", () => {
  let logSpy: jest.SpyInstance;
  let mockExit: jest.SpyInstance;
  let mockSetTimeout: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation();
    mockExit = jest.spyOn(process, "exit").mockImplementation();
    // 顺序很重要  useFakeTimers 要在 setTimeout 前
    jest.useFakeTimers();
    mockSetTimeout = jest.spyOn(global, "setTimeout");

    (deleteFolders as jest.Mock).mockReset();
    (findDirFolders as jest.Mock).mockReset();
    (calculateSizeDirs as jest.Mock).mockReset();
    (generateTable as jest.Mock).mockReset();
  });

  afterEach(() => {
    logSpy.mockRestore();
    mockExit.mockRestore();
    mockSetTimeout.mockRestore();
    jest.clearAllTimers();
  });

  it("测试 找到结果为空", async () => {
    (findDirFolders as jest.Mock).mockImplementation(() => []);
    (chalk.yellow as any).mockReturnValue(
      `\r😖 ${dirName} 不存在 node_modules`
    );
    await rmDir();
    expect(logSpy).toHaveBeenCalledWith(`\r😖 ${dirName} 不存在 node_modules`);
  });
  it("测试 获得文件列表, 大小 删除成功函数调用成功", async () => {
    (findDirFolders as jest.Mock).mockReturnValue(["path1", "path2"]);
    (calculateSizeDirs as jest.Mock).mockReturnValue({
      entires: [
        {
          path: "path1",
          size: 100,
        },
      ],
      totalSize: 100,
    });

    await rmDir();

    expect(calculateSizeDirs).toHaveBeenCalled();
    expect(deleteFolders).toHaveBeenCalled();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);

    jest.runAllTimers();
    expect(chalk.green).toHaveBeenCalledWith("删除成功");
    expect(generateTable).toHaveBeenCalled();
  });
  it("删除失败", async () => {
    (deleteFolders as jest.Mock).mockRejectedValue("");

    await rmDir();

    expect(chalk.red).toHaveBeenCalledWith("删除失败 => ");
  });
});
