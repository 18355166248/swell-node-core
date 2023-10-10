declare function rimrafDir(name?: string): Promise<void>;

declare const index_rimrafDir: typeof rimrafDir;
declare namespace index {
  export { index_rimrafDir as rimrafDir };
}

export { index as rimrafDir };
