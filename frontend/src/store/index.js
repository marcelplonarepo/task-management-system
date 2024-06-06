import {createSlice, configureStore} from "@reduxjs/toolkit";

const userInitialState = {user: {
    id: null
}};

const userSilce = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUser(state, action){
            state.user = action.payload.user;
        }
    }
})


const store = configureStore({
    reducer: userSilce.reducer
})

export const userAction = userSilce.actions;
export default store;