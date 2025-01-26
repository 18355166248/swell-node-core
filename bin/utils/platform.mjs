import os from 'os';

const getPlatform = function() {
  const platform = os.platform();
  const params = {
    isLinux: false,
    isWindow: false
  };
  switch (platform) {
    case "darwin":
      params.isLinux = true;
      break;
    case "win32":
      params.isWindow = true;
      break;
  }
  return params;
};
const getRightPath = (paths) => {
  const slash = getSlash();
  return paths.map((path) => path.replaceAll("/", slash));
};
const getSlash = function() {
  const { isWindow } = getPlatform();
  return isWindow ? "\\" : "/";
};

export { getPlatform, getRightPath, getSlash };
