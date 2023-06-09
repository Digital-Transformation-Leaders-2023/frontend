import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "@app/providers";

type User = {
  username: string;
  email: string;
  pic: string;
};

type AuthToken = {
  token: string;
  expires: Date;
};

type Store = {
  user: User | null;
  auth: AuthToken | null;
};

const initialState: Store = {
  user: null,
  auth: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<AuthToken>) {
      state.auth = action.payload;
    },
    logout: () => initialState,
  },
});


const { actions, reducer } = slice;

const useUser = (): any => {
  const { user } = useAppSelector((state) => state.user);
  return user;
};

const useIsAuthenticated = (): boolean => {
  const user = useUser();

  return !!user;
};


export {
  actions as userActions,
  reducer as userReducer,
  useIsAuthenticated,
  useUser,
};
