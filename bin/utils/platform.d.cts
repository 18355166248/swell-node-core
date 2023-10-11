declare const getPlatform: () => {
    isLinux: boolean;
    isWindow: boolean;
};
declare const getRightPath: (paths: string[]) => string[];
declare const getSlash: () => "/" | "\\";

export { getPlatform, getRightPath, getSlash };
