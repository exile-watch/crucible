/// <reference types="vitest" />
import { defaultConfig } from "@exile-watch/unit-testing-config";
import { mergeConfig } from "vitest/config";
export default mergeConfig(
  { test: { setupFiles: ["./test-setup.js"] } },
  defaultConfig,
);
