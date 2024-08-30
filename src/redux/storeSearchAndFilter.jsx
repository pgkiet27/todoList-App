import { createSlice } from "@reduxjs/toolkit"

const createSeachKeywordAndFilter = createSlice({
    name:'searchAndFilter',
    initialState: {
        keyword:'',
        statusFilter: '',
        priorityFilter: '',
    },
    reducers:{
        addSearchAndFilter: (state, action) => {
            console.log(action.payload)
            if(state.keyword !== action.payload.keyword)
                state.keyword = action.payload.keyword
            if(state.statusFilter !== action.payload.statusFilter)
                state.statusFilter = action.payload.statusFilter
            if(state.priorityFilter !== action.payload.priorityFilter)
                state.priorityFilter = action.payload.priorityFilter
        }
    }
})

export default createSeachKeywordAndFilter