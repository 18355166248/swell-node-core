import { getDirectorySize } from "./getDirectorySize";

export type FindDirFoldersProps = {
  dirs: string[];
};

export interface Entry {
  path: string;
  size: number;
}
export const calculateSizeDirs = ({
  dirs,
}: FindDirFoldersProps): {
  entires: Entry[];
  totalSize: number;
} => {
  let counter = 0;
  const entires = [];
  let totalSize = 0;
  for (const dir of dirs) {
    counter++;
    const dirSize = getDirectorySize(dir);
    totalSize += dirSize;
    entires.push({
      path: dir,
      size: dirSize,
    });
  }
  return {
    entires,
    totalSize,
  };
};
