import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
    'login/fetchUserData', async (query, thunkAPI) => {
        try {
            const userResponse = await fetch(`/reddit_login?code=${query}`);
            if (userResponse.status !== 200 ) throw new Error(userResponse.statusText)
            const userData = await userResponse.json();
            
            const dataToStore = {
                userData
            }
            return dataToStore
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }

    }
)

const loginSlice = createSlice({

    name: 'login',
    initialState: {
        data: {},
        isLogged: false,
        errMessage: '',
        isUserLoading: false

    },
    

    extraReducers: (builder) => {
        builder

            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLogged = false;
                state.errMessage = action.payload;
                state.isUserLoading = false
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.isLogged = true;
                state.data = action.payload.userData;
                state.errMessage = '';
                state.isUserLoading = false;
            })
            .addCase(fetchUserData.pending, (state, action) => {
                state.isLogged = false;
                state.errMessage = '';
                state.isUserLoading = true;
            })
    }

})

export const selectIsUserLoading = (state) => state.loginReducer.isUserLoading; 
export const selectUserData = (state) => state.loginReducer.data.data;
export const selectIsLogged = (state) => state.loginReducer.isLogged;
export const selectLoginErr = (state) => state.loginReducer.errMessage;

export default loginSlice.reducer;