import fs from "fs/promises";

export const deleteFolders = async (entries: string[], name: string) => {
  let deletedFoldersCounter = 0;
  for (const entry of entries) {
    await fs.rm(entry, { recursive: true });
    deletedFoldersCounter++;
    process.stdout.write(
      `\r🗑  正在删除 ${name} (${deletedFoldersCounter}/${entries.length})...`
    );
  }
};
