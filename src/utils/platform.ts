import os from "os";

const platform = os.platform();

export const getPlatform = function () {
  const params = {
    isLinux: false,
    isWindow: false,
  };
  switch (platform) {
    case "darwin": //unix 系统内核
      params.isLinux = true;
      break;
    case "win32": //windows 系统内核
      params.isWindow = true;
      break;
  }
  return params;
};
