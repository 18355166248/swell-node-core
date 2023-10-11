'use strict';

const os = require('os');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const os__default = /*#__PURE__*/_interopDefaultCompat(os);

const getPlatform = function() {
  const platform = os__default.platform();
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

exports.getPlatform = getPlatform;
exports.getRightPath = getRightPath;
exports.getSlash = getSlash;
