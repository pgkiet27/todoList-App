import { configureStore } from "@reduxjs/toolkit";
import createPendingTask from "./storePendingTask";
import createCompletedTask from "./storeCompletedTask";
import createSeachAndFilter from "./storeSearchAndFilter";

const store = configureStore({
    reducer: {
        create: createPendingTask.reducer,
        createCompleted: createCompletedTask.reducer,
        searchAndFilter: createSeachAndFilter.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production', 
})

export default store