import {createSlice} from '@reduxjs/toolkit'

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers:{
        addFeed: (state,action)=> action.payload,
        removeUserFromFeed: (state,action) => {
            let newfeed = state.filter((user)=> user._id ==! action.payload);
            return newfeed;
        } ,
    }
})

export const {addFeed, removeUserFromFeed} = feedSlice.actions;

export default feedSlice.reducer;