"use strict";const execa=require("execa"),platform=require("src/utils/platform"),{isLinux:l}=platform.getPlatform();async function rimrafDir(o="node_modules"){let r="rimraf";l?r=`rimraf(${o})`:r=`rimraf.windows(${o})`;try{await execa.$`${r}`&&console.log("\u5220\u9664\u6210\u529F")}catch(i){console.log(`\u5220\u9664\u5931\u8D25 => ${i}`)}}const index={__proto__:null,rimrafDir};exports.rimrafDir=index;
