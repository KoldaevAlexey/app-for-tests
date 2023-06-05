import TodoList from "./TodoList.jsx";
import { render, screen } from "@testing-library/react";

//import { useSelector } from "react-redux";
import * as reduxHooks from "react-redux";

jest.mock("react-redux");

const todos = [
    { id: "123", text: "React", completed: false },
    { id: "124", text: "Redux", completed: false },
];

const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");

describe("TodoList", () => {
    test("should create TodoList with empty todos", () => {
        //useSelector.mockReturnValue([]);
        mockedUseSelector.mockReturnValue([]);

        const view = render(<TodoList />);

        expect(view).toMatchSnapshot();
    });

    test("should create Todolist with todo items", () => {
        //useSelector.mockReturnValue(todos);
        mockedUseSelector.mockReturnValue(todos);

        const view = render(<TodoList />);

        expect(view).toMatchSnapshot();
    });
});
