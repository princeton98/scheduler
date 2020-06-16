import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";
//mport axios from "../__mocks__/axios"

afterEach(cleanup);

it("defaults to Monday and changes the scheduler when a new day is selected", () => {
  const { getByText } = render(<Application />);
  return waitForElement( () => getByText("Monday"))
  .then(() => {
    fireEvent.click(getByText("Tuesday"));
  expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});
