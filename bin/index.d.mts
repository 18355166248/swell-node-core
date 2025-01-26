declare function rmDir(name?: string): Promise<void>;

declare const index$2_rmDir: typeof rmDir;
declare namespace index$2 {
  export { index$2_rmDir as rmDir };
}

declare function swaggerToTs(): void;
declare function beforeInit(): void;

declare const index$1_beforeInit: typeof beforeInit;
declare const index$1_swaggerToTs: typeof swaggerToTs;
declare namespace index$1 {
  export { index$1_beforeInit as beforeInit, index$1_swaggerToTs as swaggerToTs };
}

declare function changesetPublish(): Promise<void>;
declare function changesetPrereleasesPublish(): Promise<void>;

declare const index_changesetPrereleasesPublish: typeof changesetPrereleasesPublish;
declare const index_changesetPublish: typeof changesetPublish;
declare namespace index {
  export { index_changesetPrereleasesPublish as changesetPrereleasesPublish, index_changesetPublish as changesetPublish };
}

export { index as changesetCore, index$2 as rmDir, index$1 as swaggerToTs };
