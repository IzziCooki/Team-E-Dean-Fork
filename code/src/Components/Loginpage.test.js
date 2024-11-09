import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./Loginpage";

//Test 1
test("can register somewhere", () => {
  render(<App />);
  const linkElement = screen.getByText(/Register/i);
  expect(linkElement).toBeInTheDocument();
});

//Test 2
test("there are two buttons", () => {
  render(<App />);
  const adders = screen.queryAllByRole("button");
  expect(adders).toHaveLength(2);
});

//Test 3
test("app has 3 images", () => {
  render(<App />);
  const header = screen.queryAllByRole("img");
  expect(header).toHaveLength(3);
});
