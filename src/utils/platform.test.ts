import { getPlatform, getRightPath } from "./platform";
import os from "os";

jest.mock("os", () => ({
  platform: jest.fn(),
}));

describe("getPlatform", () => {
  it("测试环境: window", () => {
    (os.platform as jest.Mock).mockReturnValue("win32");
    const { isLinux, isWindow } = getPlatform();
    expect(isLinux).toBe(false);
    expect(isWindow).toBe(true);
  });
  it("测试环境: linux", () => {
    (os.platform as jest.Mock).mockReturnValue("darwin");
    const { isLinux, isWindow } = getPlatform();
    expect(isLinux).toBe(true);
    expect(isWindow).toBe(false);
  });
  it('测试环境: 路径斜杠拼接转换 window', () => {
    (os.platform as jest.Mock).mockReturnValue("win32");
    const strs = getRightPath(["path1/node_modules", "path1/node_modules"])
    expect(strs).toEqual(["path1\\node_modules", "path1\\node_modules"])
  })
  it('测试环境: 路径斜杠拼接转换 linux', () => {
    (os.platform as jest.Mock).mockReturnValue("darwin");
    const strs = getRightPath(["path1/node_modules", "path1/node_modules"])
    expect(strs).toEqual(["path1/node_modules", "path1/node_modules"])
  })
});
