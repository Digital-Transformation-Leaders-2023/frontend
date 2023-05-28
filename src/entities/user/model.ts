import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "@app/providers";

type Store = {
  user: any;
  auth: {
    token: string;
    expires: Date;
  } | null;
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
    setToken(state, action: PayloadAction<Store["auth"]>) {
      state.auth = action.payload;
    },
    logout: () => initialState,
  },
});


const { actions, reducer } = slice;

const useIsAuthenticated = (): boolean => {
  const { auth } = useAppSelector((state) => state.user);
  if (!auth)
    return false;

  return !!auth.token && new Date(auth?.expires) > new Date();
};

const useUser = (): any => {
  const { user } = useAppSelector((state) => state.user);
  return user;
};

export {
  actions as userActions,
  reducer as userReducer,
  useIsAuthenticated,
  useUser,
};
