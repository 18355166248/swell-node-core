declare function rmDir(name?: string): Promise<void>;

declare const index_rmDir: typeof rmDir;
declare namespace index {
  export { index_rmDir as rmDir };
}

export { index as rmDir };
