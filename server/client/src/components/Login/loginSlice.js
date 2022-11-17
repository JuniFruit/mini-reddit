import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
    'login/fetchUserData', async (query, thunkAPI) => {
        try {
            const userResponse = await fetch(`/api/reddit_login?code=${query}`);
            if (userResponse.status !== 200) throw new Error(userResponse.statusText)
            const userData = await userResponse.json();

            window.localStorage.setItem('id', userData.userId)



            return userData
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }

    }
)

export const logout = createAsyncThunk('login/logout', async (id, thunkAPI) => {
    try {
        const response = await fetch(`/api/logout?id=${id}`);
        if (response.status !== 200) throw new Error(response.statusText);
        window.localStorage.id = undefined;
        window.location.reload();
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message)
    }
})

const loginSlice = createSlice({

    name: 'login',
    initialState: {
        data: {},
        errMessage: '',
        isUserLoading: false

    },
    reducers: {
        addUser: (state, action) => {
            state.data = action.payload
        }
    },


    extraReducers: (builder) => {
        builder

            .addCase(fetchUserData.rejected, (state, action) => {
                state.errMessage = action.payload;
                state.isUserLoading = false
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.errMessage = '';
                state.isUserLoading = false;
            })
            .addCase(fetchUserData.pending, (state, action) => {
                state.errMessage = '';
                state.isUserLoading = true;
            })
            .addCase(logout.rejected, (state, action) => {
                state.errMessage = action.payload
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.data = {};

            })
    }

})

export const selectIsUserLoading = (state) => state.loginReducer.isUserLoading;
export const selectUserData = (state) => state.loginReducer.data;
export const selectLoginErr = (state) => state.loginReducer.errMessage;
export const selectToken = (state) => state.loginReducer.data.token;

export const { addUser } = loginSlice.actions;

export default loginSlice.reducer;