import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./Loginpage";
import { BrowserRouter as Router } from "react-router-dom";

describe("Loginpage component", () => {
  test("renders loginpage component", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const linkElement = screen.getByText(/Register/i);
    expect(linkElement).toBeInTheDocument();
    const adders = screen.queryAllByRole("button");
    expect(adders).toHaveLength(2);
    const header = screen.queryAllByRole("img");
    expect(header).toHaveLength(3);
  });
});
