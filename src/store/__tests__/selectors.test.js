import { selectTodos } from "../selectors";

describe("redux selectors", () => {
    test("should select todos from state object", () => {
        const todos = [{ id: 1, text: "Redux", completed: false }];

        const result = selectTodos({ todos });

        expect(result).toEqual(todos);
    });
});
