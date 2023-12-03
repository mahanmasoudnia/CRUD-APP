import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Redux/auth/authSlice";
import postsData from "./Redux/postData/postDataSlice";
import authorsList from "./Redux/authorsList/authorsList";
// import deletePostSlice from './Redux/deletePost/deletePostSlice';
import addNewPostSlice from "./Redux/addNewPost/addNewPostSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    postsData: postsData,
    AddNewPostSlice: addNewPostSlice,
    AuthorsList: authorsList,
    // deletePostSlice:deletePostSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
