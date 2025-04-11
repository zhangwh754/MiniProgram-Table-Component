// 第一种方式
/** @type {import('jest').Config} */
const config = {
  // jest 内置 jsdom，所以不需要额外引入。
  testEnvironment: "jsdom",
  // 配置 jest-snapshot-plugin 从而在使用 jest 的 snapshot 功能时获得更加适合肉眼阅读的结构
  snapshotSerializers: ["miniprogram-simulate/jest-snapshot-plugin"],
};

module.exports = config;
