import os from "os";

export const getPlatform = function () {
  const platform = os.platform();
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
