import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../Services/httpService";
import { API_BASE_URL } from "../../Services/Url";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthursListState {
  Authors: object[] | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthursListState = {
  Authors: null,
  loading: "idle",
  error: null,
};

export const AuthorsListAsync = createAsyncThunk("Authors", async () => {
  try {
    const response = await http.get(`${API_BASE_URL}/authors`);
    if (response.status === 200) {
      const postsData = response.data;
      return postsData;
    } else {
      toast.error(" not found!, try again", {
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

const AuthorsList = createSlice({
  name: "Authors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AuthorsListAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(AuthorsListAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.Authors = action.payload;
      })
      .addCase(AuthorsListAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Login failed";
      });
  },
});

export default AuthorsList.reducer;
