import { render, waitFor } from "@testing-library/react";
import React from "react";

import { describe, expect, it } from "vitest";
import ListEncounters from "./ListEncounters"; // Adjust the import path as necessary

describe("ListEncounters", () => {
  it("renders correctly after fetching data", async () => {
    const data = [
      {
        someEncounterId: {
          path: "some-path",
          name: "Some Encounter",
          isCategory: true,
        },
      },
    ];
    const { findByText } = render(<ListEncounters data={data as any} />);

    await waitFor(() => {
      expect(findByText("Some Encounter")).toBeTruthy();
    });
  });
});
