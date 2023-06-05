import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import App from "../App";

describe("App component", () => {
  test("Router test", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const mainLink = screen.getByTestId("main-link");
    const aboutLink = screen.getByTestId("about-link");

    act(() => {
      userEvent.click(aboutLink);
    });

    expect(screen.getByTestId("about-page")).toBeInTheDocument();

    act(() => {
      userEvent.click(mainLink);
    });

    expect(screen.getByTestId("main-page")).toBeInTheDocument();
  });
});
