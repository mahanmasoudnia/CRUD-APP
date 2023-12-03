import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDataAsync } from "@/Redux/postData/postDataSlice";
import PostCard from "../../Common/Card/Card";
import { RootState } from "@/store";
import Card from "../../Common/Card/Card";
import { formatDate } from "@/utils/formatDate";
import http from "@/Services/httpService";
import { SlLogout, SlPencil, SlPlus, SlTrash } from "react-icons/sl";
import Modal from "../../Common/Modal/Modal";
import AddPost from "./AddPost";
import { useNavigate } from "react-router";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import SubmitButton from "../../Common/Button/Button";
import PostsTable from "./Table";
import { logout } from "@/Redux/auth/authSlice";
import { Post } from "@/types";

const PostList = () => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [authors, setAuthors] = useState<any[]>([]);

  const getPostsData = useCallback(() => {
    dispatch<any>(postDataAsync());
  }, [dispatch]);

  useEffect(() => {
    getPostsData();
  }, [getPostsData]);
  const data = useSelector(
    (state: RootState) => state.postsData.postsData,
  ) as Post[];

  const loading = useSelector((state: RootState) => state.postsData.loading);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
    console.log(loading);
  }, [loading]);

  return (
    <>
      <div className="flex items-center justify-between border-b-2 border-[#E5E5E5] mb-10 pb-[2.05rem]">
        <h2 className="font-bold text-[2.2rem]">Post List</h2>

        <SubmitButton
          onClick={() => {
            dispatch<any>(logout());
          }}
          className="bg-gray-400  hover:bg-gray-500 "
        >
          <SlLogout /> LogOut
        </SubmitButton>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {data && <PostsTable data={data} />}
      </div>
    </>
  );
};

export default PostList;
