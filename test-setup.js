import { vi } from "vitest";

const mockLocalFont = vi.fn().mockImplementation(() => {
  return {
    src: "mocked-font-path",
    variable: "--global-font-fontin",
  };
});

vi.mock("next/font/local", () => {
  return {
    default: mockLocalFont,
  };
});
