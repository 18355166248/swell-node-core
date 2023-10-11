import { generateTable } from "./generateTable";
import { unitsFormatter } from "./unitsFormatter";

jest.mock("./unitsFormatter");

describe("generateTable", () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation();

    (unitsFormatter as jest.Mock).mockImplementation((bytes) => `${bytes}MB`);
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it("生成表格的totalSize", () => {
    generateTable({
      entires: [
        {
          path: "path1",
          size: 100,
        },
        {
          path: "path2",
          size: 200,
        },
      ],
      totalSize: 300,
    });

    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("总大小")
    );
    expect(logSpy).toHaveBeenNthCalledWith(2, expect.stringContaining("300MB"));
  });
});
