import fs from "fs/promises";
import { deleteFolders } from "./deleteFolders";

jest.mock("fs/promises", () => {
  const originalPromisesFS = jest.requireActual("fs/promises");

  return {
    ...originalPromisesFS,
    rm: jest.fn(),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

// 监听 process.stdout.write 事件
const stdoutSpy = jest.spyOn(process.stdout, "write").mockImplementation();

describe("deleteFolders", () => {
  it("正确执行删除文件夹", async () => {
    const mockEntries = ["test/path", "test3/path"];

    await deleteFolders(mockEntries, "path");

    expect(fs.rm).toHaveBeenCalledTimes(2);
    expect(fs.rm).toHaveBeenCalledWith("test/path", { recursive: true });
    expect(fs.rm).toHaveBeenCalledWith("test3/path", { recursive: true });
    expect(stdoutSpy).toHaveBeenCalledWith("\r🗑  正在删除 path (2/2)...");
  });
});
