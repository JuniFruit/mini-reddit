import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const fetchSearchResults = createAsyncThunk('searchResults', async ({ after = '', query = '', previousChildren = [] }, thunkAPI) => {
    try {
        console.log(query)
        const response = await fetch(`/search?q=${query}&after=${after}`);
        if (response.status !== 200) throw new Error(response.statusText);

        const data = await response.json();
   
        const dataToStore = {
            [data[0].data.after.replace(/_\w+/, '')]: {
                after: data[0].data.after,
                children: [...previousChildren, ...data[0].data.children]
            },
            [data[1].data.after.replace(/_\w+/, '')]: {
                after: data[1].data.after,
                children: [...previousChildren, ...data[1].data.children]
            }
        }


        return dataToStore
    } catch (e) {
        thunkAPI.rejectWithValue(e.message)
    }
})


const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState: {
        data: {},
        isSearchFetching: false,
        errMessage: ''
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.errMessage = action.payload;
                state.isSearchFetching = false
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                
                state.data = {
                    ...state.data,
                    ...action.payload
                }
                state.errMessage = '';
                state.isSearchFetching = false;
            })
            .addCase(fetchSearchResults.pending, (state, action) => {
                state.isSearchFetching = true;
                state.errMessage = '';
            })
    }
})

export const selectSearchResults = (state) => state.searchResultsReducer.data;
export const selectIsSearchFetching = (state) =>  state.searchResultsReducer.isSearchFetching;
export const selectSearchErr = (state) => state.searchResultsReducer.errMessage;



export default searchResultsSlice.reducer;