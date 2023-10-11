import fs from "fs/promises";
import { findDirFolders } from "./findDirFolders";
import { getRightPath } from '../../utils/platform';

jest.mock("fs/promises", () => ({
  readdir: jest.fn(),
}));

describe("findDirFolders", () => {
  it("递归查询所有符合标准的文件夹", async () => {
    (fs.readdir as jest.Mock).mockImplementation(async (dir) => {
      switch (dir) {
        case "path1":
          return [
            {
              isDirectory: () => true,
              name: "node_modules",
            },
            {
              isDirectory: () => false,
              name: "node_modules",
            },
            {
              isDirectory: () => true,
              name: "node_modules",
            },
          ];
          break;
        case "path2":
          return [
            {
              isDirectory: () => true,
              name: "test",
            },
            {
              isDirectory: () => true,
              name: "test2",
            },
            {
              isDirectory: () => true,
              name: "test3",
            },
            {
              isDirectory: () => false,
              name: "test3",
            },
          ];
          break;

        default:
          return [];
      }
    });

    const list = await findDirFolders("path1", "node_modules");
    expect(list).toEqual(getRightPath(["path1/node_modules", "path1/node_modules"]));

    const list2 = await findDirFolders("path2", ["test", "test2"]);
    expect(list2).toEqual(getRightPath(["path2/test", "path2/test2"]));
  });
});
