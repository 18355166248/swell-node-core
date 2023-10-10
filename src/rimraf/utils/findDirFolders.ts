import fs from "fs/promises";
import path from "path";

// 递归查询所有符合标准的文件夹路径
export async function findDirFolders(
  startPath: string,
  paths: string | string[]
): Promise<string[]> {
  const results: string[] = [];

  async function findDirRecursive(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (hasPath(paths, entry.name)) {
          results.push(path.join(dir, entry.name));
        } else {
          await findDirRecursive(path.join(dir, entry.name));
        }
      }
    }
  }

  await findDirRecursive(startPath);
  return results;
}

function hasPath(paths: string | string[], file: string) {
  if (Array.isArray(paths)) {
    return paths.includes(file);
  }
  return paths === file;
}
