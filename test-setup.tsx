import { WritProvider } from "@exile-watch/writ-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React, { ReactNode } from "react";

// Override the default render method
const customRender = (ui: ReactNode, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => <WritProvider>{children}</WritProvider>,
    ...options,
  });

// Re-export everything
export * from "@testing-library/react";

// Override the render method
export { customRender as render };
