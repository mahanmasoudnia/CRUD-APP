import React from "react";
import PostList from "../../Components/Layout/postList/PostList";
import { SlArrowLeft, SlMagnifier } from "react-icons/sl";

const Home = () => {
  return (
    <div className="container py-[2rem]">
      <PostList />
    </div>
  );
};

export default Home;
