import type { RootState } from "@/stores";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthUserState = {
  id?: string | null;
  email?: string | null;
};

const initialState: AuthUserState = {
  id: "",
  email: "",
};

const authUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<AuthUserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
    },
    setLogout: (state) => {
      state.id = null;
      state.email = null;
    },
  },
});

export const selectUserId = (state: RootState) => state.authUser.authUser.id;
export const selectUserEmail = (state: RootState) =>
  state.authUser.authUser.email;

export const { setActive, setLogout } = authUserSlice.actions;

export default authUserSlice.reducer;
