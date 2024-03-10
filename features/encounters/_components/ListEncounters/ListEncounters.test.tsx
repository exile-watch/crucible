import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

import { beforeEach, describe, expect, it, vi } from "vitest";
import ListEncounters from "./ListEncounters"; // Adjust the import path as necessary

vi.mock(
  "@exile-watch/encounter-data/dist/extracted-data/encounters.esm",
  () => {
    return {
      __esModule: true,
      default: Promise.resolve({
        someEncounterId: {
          path: "some-path",
          name: "Some Encounter",
          isCategory: true,
        },
      }),
    };
  },
);

describe("ListEncounters", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders nothing when data is null", async () => {
    vi.mock(
      "@exile-watch/encounter-data/dist/extracted-data/encounters.esm",
      () => {
        return {
          __esModule: true,
          default: Promise.resolve(null),
        };
      },
    );

    render(<ListEncounters />);

    expect(screen.queryByText("Some Encounter")).toBeFalsy();
  });

  it("renders correctly after fetching data", async () => {
    const { findByText } = render(<ListEncounters />);

    await waitFor(() => {
      expect(findByText("Some Encounter")).toBeTruthy();
    });
  });
});
