import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../Services/httpService";
import { API_BASE_URL } from "../../Services/Url";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthState {
  postsData: object | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  decodedToken: object | null | undefined;
}

const initialState: AuthState = {
  postsData: null,
  loading: "idle",
  error: null,
  decodedToken: null,
};

export const postDataAsync = createAsyncThunk("postsData", async () => {
  try {
    const response = await http.get(`${API_BASE_URL}/posts`);
    if (response.status === 200) {
      const postsData = response.data;
      return postsData;
    } else if (response.status === 404) {
      toast.error("user not found!", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  } catch (error: any) {
    toast.error("There Is A Problem!", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }
});

const postsData = createSlice({
  name: "postsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postDataAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(postDataAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.postsData = action.payload;
      })
      .addCase(postDataAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Login failed";
      });
  },
});

export default postsData.reducer;
