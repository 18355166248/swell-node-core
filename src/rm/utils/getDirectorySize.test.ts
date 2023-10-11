import { getDirectorySize } from "./getDirectorySize";
import { execSync } from "node:child_process";

jest.mock("node:child_process", () => ({
  execSync: jest.fn(),
}));

describe("getDirectorySize", () => {
  it("获取文件夹大小", () => {
    (execSync as jest.Mock).mockReturnValue(Buffer.from("10"));
    const size = getDirectorySize("mock-path");

    expect(size).toBe(5120);
  });
  it("错误文件夹应该返回0并打印错误信息", () => {
    (execSync as jest.Mock).mockImplementation(() => {
      throw new Error("error");
    });
    console.error = jest.fn();

    const size = getDirectorySize("mock-invalid-path");
    expect(size).toBe(0);
    expect(console.error).toHaveBeenLastCalledWith(
      expect.stringContaining("获取文件夹大小失败 mock-invalid-path:"),
      expect.any(Error)
    );
  });
});
