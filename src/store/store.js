import { configureStore } from "@reduxjs/toolkit";

import todos from "./todoSlice";

const store = configureStore({
    reducer: {
        todos,
    },
});

export default store;
