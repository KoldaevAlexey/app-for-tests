import todoSlice, { addTodo, removeTodo, toggleComplete } from "../todoSlice";

describe("todoSlice", () => {
    test("should return default state when passed an empty action", () => {
        const result = todoSlice(undefined, { type: "" });

        expect(result).toEqual([]);
    });

    test('should add new todo item with "addTodo" action', () => {
        const action = { type: addTodo.type, payload: "Redux" };

        const result = todoSlice([], action);

        expect(result[0].text).toBe("Redux");
        expect(result[0].completed).toBe(false);
    });

    test('should toggle todo completed status with "toggleComplete" action', () => {
        const action = { type: toggleComplete.type, payload: 1 };

        const result = todoSlice([{ id: 1, completed: false }], action);

        expect(result[0].completed).toBe(true);
    });

    test('should remove todo by id with "removeTodo" action', () => {
        const action = { type: removeTodo.type, payload: 1 };

        const result = todoSlice(
            [
                { id: 1, completed: false },
                { id: 2, completed: true },
            ],
            action
        );

        expect(result.length).toEqual(1);
    });
});
