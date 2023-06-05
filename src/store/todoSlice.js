import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/todos?_limit=10"
            );

            if (!response.ok) {
                throw new Error("can't fetch");
            }

            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.error.message;
};

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.push({
                id: new Date().toISOString(),
                text: action.payload,
                completed: false,
            });
        },
        toggleComplete(state, action) {
            const toggledTodo = state.find(
                (todo) => todo.id === action.payload
            );
            toggledTodo.completed = !toggledTodo.completed;
        },
        removeTodo(state, action) {
            return state.filter((todo) => todo.id !== action.payload);
        },
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: setError,
    },
});

export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
