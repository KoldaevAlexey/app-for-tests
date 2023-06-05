import todoSlice, {
  addTodo,
  removeTodo,
  toggleComplete,
  fetchTodos,
} from "../todoSlice";

const initialState = {
  todos: [],
  status: null,
  error: null,
};

global.fetch = jest.fn();

describe("todoSlice", () => {
  test("should return default state when passed an empty action", () => {
    const result = todoSlice(undefined, { type: "" });

    expect(result).toEqual(initialState);
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

  test('should change status with "fetchTodos.pending" action and "fetchTodos.fulfilled" action', async () => {
    const mockTodos = [
      {
        id: 1,
        title: "test",
        completed: false,
        userId: 1,
      },
    ];

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });

    const dispatch = jest.fn();
    const thunk = fetchTodos();

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchTodos.pending().type);
    expect(end[0].type).toBe(fetchTodos.fulfilled().type);
    expect(end[0].payload).toBe(mockTodos);
  });
  test('should change status and error with "fetchTodos.rejected"', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = fetchTodos();

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchTodos.pending().type);
    expect(end[0].type).toBe(fetchTodos.rejected().type);
    expect(end[0].payload).toBe("can't fetch");
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });

  test("extraReducers tests pending", () => {
    const state = todoSlice(initialState, fetchTodos.pending());
    expect(state.status).toBe("loading");
    expect(state.error).toBeNull();
  });

  test("extraReducers tests fulfilled", () => {
    const todos = [
      {
        id: 1,
        title: "test",
        completed: false,
        userId: 1,
      },
    ];
    const state = todoSlice(initialState, fetchTodos.fulfilled(todos));
    expect(state).toEqual({
      todos: todos,
      status: "resolved",
      error: null,
    });
  });
  test("extraReducers tests rejected", () => {
    const action = {
      type: fetchTodos.rejected.type,
      payload: "Can't fetch",
    };

    const state = todoSlice(initialState, action);

    expect(state).toEqual({
      todos: [],
      status: "rejected",
      error: "can't fetch",
    });
  });
});
