import { createSlice } from '@reduxjs/toolkit'

const createPendingTask = createSlice({
    name: 'create',
    initialState: [
        {id: 1, name:'Go shopping', priority:'Medium', description:'Buy fish and carrot', completed:false}, 
        {id: 2, name:'Do homework', priority:'High', description:'Do math and science', completed:false},
        {id: 3, name:'Clean the floor', priority:'Low', description:'Wash the hands after do', completed:false},
    ],
    reducers:{
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload)
        }
    }
})

export default createPendingTask