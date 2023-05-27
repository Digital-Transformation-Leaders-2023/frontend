import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    reset: () => initialState,
  },
});


const { actions, reducer } = slice;

export {
  actions as userActions,
  reducer as userReducer,
};
