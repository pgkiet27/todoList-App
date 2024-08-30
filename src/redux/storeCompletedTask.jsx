import { createSlice } from "@reduxjs/toolkit"

const createCompletedTask = createSlice({
    name: 'createCompleted',
    initialState: [

    ],
    reducers:{
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload)
        },
    }
})

export default createCompletedTask