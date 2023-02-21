import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  moduleFileExtensions: ["tsx", "ts", "jsx", "js"],
  setupFiles: ["<rootDir>/test/setupTests.ts"],
  testEnvironment: "jsdom",
  maxWorkers: 1,
};

export default config;
