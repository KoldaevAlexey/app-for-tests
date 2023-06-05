import TodoItem from "./TodoItem.jsx";

import { render, screen, fireEvent } from "@testing-library/react";
import * as reduxHooks from "react-redux";
import * as actions from "../../store/todoSlice";

jest.mock("react-redux");

const mockedDispatch = jest.spyOn(reduxHooks, "useDispatch");

describe("TodoItem", () => {
    test("should create TodoItem", () => {
        mockedDispatch.mockResolvedValue(jest.fn());

        const view = render(
            <TodoItem id="123" text="Redux" completed={false} />
        );

        expect(view).toMatchSnapshot();
    });

    test("should dispatch actions", () => {
        const dispatch = jest.fn();
        mockedDispatch.mockReturnValue(dispatch);

        const mockedToggleComplete = jest.spyOn(actions, "toggleComplete");
        const mockedRemoveTodo = jest.spyOn(actions, "removeTodo");

        const view = render(
            <TodoItem id="123" text="Redux" completed={false} />
        );

        fireEvent.click(screen.getByRole("checkbox"));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedToggleComplete).toHaveBeenCalledWith("123");

        fireEvent.click(screen.getByRole("button"));

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(mockedRemoveTodo).toHaveBeenCalledWith("123");
    });
});
