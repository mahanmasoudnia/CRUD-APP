import {
  createSlice,
  createAsyncThunk,
  AsyncThunkAction,
} from "@reduxjs/toolkit";
import http from "../../Services/httpService";
import { API_BASE_URL } from "../../Services/Url";
import { toast } from "react-toastify";
import axios from "axios";

interface AuthState {
  token: string | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  decodedToken: object | null | undefined;
}

const initialState: AuthState = {
  token: null,
  loading: "idle",
  error: null,
  decodedToken: null,
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }, { dispatch }) => {
    try {
      const response = await http.post(`${API_BASE_URL}/login`, credentials);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common["Authorization"] =
          "JWT " + response.data.token;
        const token = response.data.token;
        toast.success("Welcome!", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });

        return token;
      }
    } catch (error: any) {
      console.log(error.response);
      if (error.response.status === 401) {
        toast.error("user not found!", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    }
  },
);

export const logout = createAsyncThunk<void, void>(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      window.location.replace("/login");
    } catch (error: any) {}
  },
);

const logoutSuccess = (state: AuthState) => {
  state.token = null;
  state.loading = "idle";
  state.error = null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.token = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Login failed";
      })
      .addCase(logout.pending, (state) => {
        // Handle any pending actions related to logout if needed
      })
      .addCase(logout.fulfilled, logoutSuccess)
      .addCase(logout.rejected, (state, action) => {
        // Handle any potential errors during logout
        state.loading = "failed";
        state.error = action.error.message || "Logout failed";
      });
  },
});

export default authSlice.reducer;
