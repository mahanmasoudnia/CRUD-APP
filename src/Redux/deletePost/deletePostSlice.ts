// postDataSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../Services/httpService";
import { API_BASE_URL } from "../../Services/Url";
import { toast } from "react-toastify";
import { postDataAsync } from "../postData/postDataSlice";
interface Post {
  id: string;
}

interface PostState {
  postsData: Post[];
  loading: boolean;
}

const initialState: PostState = {
  postsData: [],
  loading: false,
};

export const deletePostAsync = createAsyncThunk<void, string>(
  "posts/deletePost",
  async (id: string, { dispatch }) => {
    await http
      .delete(`${API_BASE_URL}/posts?id=${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Deleted Successfully!", {
            position: "top-right",
            autoClose: 1000,
            closeOnClick: true,
            pauseOnHover: true,
          });
          (
            document.getElementById("my_modal_7 delete") as HTMLDialogElement
          ).close();
          dispatch(postDataAsync());
        } else {
          toast.error("Try Again!", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Try Again!", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      });
  },
);
