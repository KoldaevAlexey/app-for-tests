import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Search from "./Search";

const onChange = jest.fn();

describe("Search component", () => {
    test("renders Search component", () => {
        render(
            <Search value="" onChange={onChange}>
                Find:
            </Search>
        );

        expect(screen.getByText("Find:")).toBeInTheDocument();
    });

    test("renders without children", () => {
        render(<Search value="" onChange={onChange} />);

        expect(screen.getByText("Search")).toBeInTheDocument();
    });

    test("renders without placeholder", () => {
        render(<Search value="" onChange={onChange} />);

        expect(screen.getByPlaceholderText("search...")).toBeInTheDocument();
    });

    test("custom placeholder works correctly", () => {
        render(<Search value="" onChange={onChange} placeholder="find post" />);

        expect(screen.getByPlaceholderText("find post")).toBeInTheDocument();
    });

    test("onChange works", () => {
        render(
            <Search value="" onChange={onChange}>
                Find:
            </Search>
        );

        userEvent.type(screen.getByRole("textbox"), "React");

        expect(onChange).toHaveBeenCalledTimes(5);
    });

    test("Search spanshot", () => {
        const view = render(
            <Search value="" onChange={onChange}>
                Find:
            </Search>
        );

        expect(view).toMatchSnapshot();
    });
});
