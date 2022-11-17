import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const fetchCommentUserData = createAsyncThunk('commentUserData', async ({author, commentsSort}, thunkAPI) => {

    try {
        const response = await fetch(`/api/user_about?user=${author}`);
    if (response.status !== 200) throw new Error(response.statusText);

        const data = await response.json();
        const dataToStore = {
            [commentsSort]: {
                ...data
            }
        }
        return dataToStore;
    } catch (e) {
        thunkAPI.rejectWithValue(e.message)
    }
} )



const commentsAuthorSlice = createSlice({
    name: 'commentUserData',
    initialState: {
        usersData: {},
        isCommentsAuthorFetching: false,
        errMessage: ''
    },

    
    extraReducers: (builder) => {
        builder
           
            .addCase(fetchCommentUserData.rejected, (state, action) => {
                state.isCommentsAuthorFetching = false;
                state.errMessage = action.payload;
            })
            .addCase(fetchCommentUserData.fulfilled, (state, action) => {
                const commentSort = Object.keys(action.payload)[0];

                state.usersData[commentSort] = {
                    ...state.usersData[commentSort],
                    ...action.payload[commentSort],
                    
                }
                state.isCommentsAuthorFetching = false;
                state.errMessage = '';
            })
            .addCase(fetchCommentUserData.pending, (state, action) => {
                state.isCommentsAuthorFetching = true;
                state.errMessage = '';
            })


    }
})

export const selectCommentUserData = (state, author, commentsSort) => state.commentsAuthorReducer.usersData[commentsSort]?.[author];
export const selectIsCommentsAuthorFetching = (state) => state.commentsAuthorReducer.isCommentsAuthorFetching;
export const selectCommentAuthorErrMsg = (state) => state.commentsAuthorReducer.errMessage;

export default commentsAuthorSlice.reducer