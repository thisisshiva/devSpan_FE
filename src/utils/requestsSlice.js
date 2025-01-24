import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        addRequests: (state,action)=>{
            return action.payload
        },
        removeRequest : (state,action)=>{
            const newArr = state.filter((reqs)=> reqs._id !== action.payload._id)
            return newArr;
        }
    }
})

export const {addRequests,removeRequest} = requestSlice.actions; 

export default requestSlice.reducer;