import { execSync } from "node:child_process";

export function getDirectorySize(dirPath: string): number {
  try {
    // du文档: https://www.runoob.com/linux/linux-comm-du.html
    // du 会显示指定的目录或文件所占用的磁盘空间。
    // -s或--summarize 仅显示总计。
    const sizeInBlocks = parseInt(
      execSync(`du -s "${dirPath}" | cut -f1`).toString().trim(),
      10
    );

    const sizeInBytes = sizeInBlocks * 512;
    return sizeInBytes;
  } catch (err) {
    console.error(`获取文件夹大小失败 ${dirPath}:`, err);
    return 0;
  }
}
