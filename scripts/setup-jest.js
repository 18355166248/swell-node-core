// 监听log 项目中测试阶段不允许存在log
jest.spyOn(global.console, "log").mockImplementationOnce((message) => {
  // if (message) {
  //   global.console.warn(message);
  // }
});
