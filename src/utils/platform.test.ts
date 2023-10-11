import { getPlatform } from "./platform";
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
  it("测试环境: window", () => {
    (os.platform as jest.Mock).mockReturnValue("darwin");
    const { isLinux, isWindow } = getPlatform();
    expect(isLinux).toBe(true);
    expect(isWindow).toBe(false);
  });
});
