import React from "react";
import { useDispatch } from "react-redux";

import { removeTodo, toggleComplete } from "../../store/todoSlice";

const TodoItem = ({ id, text, completed }) => {
    const dispatch = useDispatch();

    return (
        <li>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => dispatch(toggleComplete(id))}
            />
            <span>{text}</span>
            <span onClick={() => dispatch(removeTodo(id))} role="button">
                Delete
            </span>
        </li>
    );
};

export default TodoItem;
