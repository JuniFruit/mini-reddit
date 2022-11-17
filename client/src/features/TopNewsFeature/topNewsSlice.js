import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const fetchTopNews = createAsyncThunk('news/fetchTopNews', async (country = 'CA', thunkAPI) => {

    try {
        const response = await fetch(`/api/news?country=${country}`);
        if (response.status !== 200 ) throw new Error(response.statusText)
        const data = await response.json();
                
        const dataToStore = {
            [country]: [...data.newsData]
        }
        
        return dataToStore
    } catch (e) {

        return thunkAPI.rejectWithValue(e.message)
    }

});


const topNewsSlice = createSlice({

    name: 'news',
    initialState: {
        data: {},
        errMessage: '',
        isNewsLoading: false,        
    },
    reducers: {
        setError: (state, action) => {
            state.errMessage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopNews.rejected, (state, action) => {
                state.errMessage = action.payload;
                state.isNewsLoading = false
            })
            .addCase(fetchTopNews.fulfilled, (state, action) => {
                state.data = {
                    ...state.data,
                    ...action.payload
                };
                state.errMessage = '';
                state.isNewsLoading = false;
            })
            .addCase(fetchTopNews.pending, (state, action) => {
                state.isNewsLoading = true;
                state.errMessage = '';
            })
                       
    }
})

export const selectTopNews = (state, country) => state.topNewsReducer.data[country];
export const selectIsNewsLoading = (state) => state.topNewsReducer.isNewsLoading;
export const selectNewsErr = (state) => state.topNewsReducer.errMessage;

export const {setError} = topNewsSlice.actions;

export default topNewsSlice.reducer;