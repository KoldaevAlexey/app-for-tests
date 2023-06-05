import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App component", () => {
    test("App renders", () => {
        render(<App />);

        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.getByText("Find course:")).toBeInTheDocument();
    });
});
