import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async () => {

    try {
        const response = await fetch("/popular");
        const data = await response.json();
        
        return data;
    } catch (e) {
        
        return e.message
    }
    
});

const postsSlice = createSlice({

    name: 'posts',
    initialState: {
        data: {},
        errMessage: ''
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularPosts.rejected, (state, action) => {
                state.errMessage = action.payload.message
            })
            .addCase(fetchPopularPosts.fulfilled, (state, action) => {
               
                state.data = action.payload.data
                state.errMessage = ''
            })
    }
})

export const selectPostsData = (state) => state.postsReducer.data;

export default postsSlice.reducer;