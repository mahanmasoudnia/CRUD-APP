// store.ts
import {
  createSlice,
  createAsyncThunk,
  configureStore,
  PayloadAction,
} from "@reduxjs/toolkit";
import http from "../../Services/httpService";
import { API_BASE_URL } from "../../Services/Url";
import { toast } from "react-toastify";
import { postDataAsync } from "../postData/postDataSlice";

interface NewPostState {
  title: string;
  content: string;
  userId: string;
}

const initialState: NewPostState = {
  title: "",
  content: "",
  userId: "",
};
export const submitNewPostAsync = createAsyncThunk(
  "Add/submitNewPost",
  async (credentials: NewPostState, { dispatch }) => {
    try {
      const response = await http.post(`${API_BASE_URL}/posts`, credentials);
      if (response.status === 200) {
        toast.success("Post got Send", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        (
          document.getElementById("my_modal_7 add") as HTMLDialogElement
        ).close();
        dispatch(postDataAsync());
      } else {
        toast.error(`${response.statusText} Try Again `, {
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
  },
);
export const editNewPostAsync = createAsyncThunk(
  "Edit/submitEditPost",
  async (credentials: NewPostState, { dispatch }) => {
    try {
      const response = await http.patch(`${API_BASE_URL}/posts`, credentials);
      if (response.status === 200) {
        toast.success("Post got Send", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        (
          document.getElementById("my_modal_7 add") as HTMLDialogElement
        ).close();
        dispatch(postDataAsync());
      } else {
        toast.error(`${response.statusText} Try Again `, {
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
  },
);

const AddNewPostSlice = createSlice({
  name: "AddNewPostSlice",
  initialState,
  reducers: {},
});

export default AddNewPostSlice.reducer;
