import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await api.post("/logout");
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export const { setUser, setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
