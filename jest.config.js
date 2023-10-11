module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/scripts/setup-jest.js"],
  collectCoverage: true,
  collectCoverageFrom: ["!/node_modules/", "!build/", "src/**/*.ts"],
  coveragePathIgnorePatterns: ["src/bin.ts", "src/index.ts"],
};
