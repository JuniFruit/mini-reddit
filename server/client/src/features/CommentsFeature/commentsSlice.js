import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addSinglePost } from "../../components/PostComponent/postsSlice";



export const fetchPostComments = createAsyncThunk('comments', async ({ postId, title, subreddit, commentSort, token = '' }, thunkAPI) => {

    try {
      
        const response = await fetch(`/api/get_comments?subreddit=${subreddit}&title=${title}&postId=${postId}&sort=${commentSort}&token=${token}`);

        if (response.status !== 200) throw new Error(response.statusText)
        const data = await response.json();

        const dataToStore = {
            [data[0].data.children[0].data.id]: {
                [commentSort]: [...data[1].data.children]
            }
        }
         thunkAPI.dispatch(addSinglePost({subreddit, data: data[0].data.children}))

        return dataToStore
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const fetchMorePostComments = createAsyncThunk('moreComments', async ({ 
    children, parent_id, name, postId, commentSort, token }, thunkAPI) => {

    try {
        const response = await fetch(`/api/get_more_comments?children=${children.join(',')}&link_id=${parent_id}&name=${name}&sort=${commentSort}&token=${token}`)

        if (response.status !== 200) throw new Error(response.statusText);

        const data = await response.json();

        
        const dataToStore = {            
            currentPostId: postId,
            currentSort: commentSort,
            data: data.json.data.things

        }
        return dataToStore


    } catch (e) {
        thunkAPI.rejectWithValue(e.message)
    }
})




const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        data: {},
        isCommentsListFetching: false,       
        errMessage: ''
    },
    reducers: {
        changeData: (state, action) => {
            state.data[action.payload.postId][action.payload.commentSort] = action.payload.data;
        },
        addThread: (state, action) => {
            state.data[action.payload.postId][action.payload.commentSort].unshift(action.payload.thread)
        }
        
    },

    
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostComments.rejected, (state, action) => {
                state.isCommentsListFetching = false;
                state.errMessage = action.payload;
            })
            .addCase(fetchPostComments.fulfilled, (state, action) => {
                const currentSrId = Object.keys(action.payload)[0];
                state.data = {
                    ...state.data,
                    [currentSrId]: {
                        ...state.data[currentSrId],
                        ...action.payload[currentSrId]                        
                    }                    
                }
                state.errMessage = '';
                state.isCommentsListFetching = false;
            })
            .addCase(fetchPostComments.pending, (state, action) => {
                state.isCommentsListFetching = true;
                state.errMessage = '';
            })
            .addCase(fetchMorePostComments.rejected, (state, action) => {
                state.isCommentsListFetching = false;
                state.errMessage = action.payload;
            })
            .addCase(fetchMorePostComments.fulfilled, (state, action) => {

                state.errMessage = '';
                state.data[action.payload.currentPostId]   
                    [action.payload.currentSort] = [...state.data[action.payload.currentPostId][action.payload.currentSort], ...action.payload.data]


                state.isCommentsListFetching = false;
            })
            .addCase(fetchMorePostComments.pending, (state, action) => {
                state.isCommentsListFetching = true;
                state.errMessage = '';
            })
            


    }
})

export const selectPostComments = (state, id, commentSort) => state.commentsReducer.data[id]?.[commentSort]
export const selectIsCommentsListFetching = (state) => state.commentsReducer.isCommentsListFetching;
export const selectCommentsErr = (state) => state.commentsReducer.errMessage;
export const {changeData, addThread} = commentsSlice.actions;



export default commentsSlice.reducer