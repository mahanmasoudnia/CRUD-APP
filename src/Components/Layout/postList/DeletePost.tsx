import React, { useEffect, useState } from "react";
import Modal from "../../Common/Modal/Modal";
import { SlTrash } from "react-icons/sl";
import { deletePostAsync } from "@/Redux/deletePost/deletePostSlice";
import { useDispatch } from "react-redux";
import SubmitButton from "../../Common/Button/Button";

type DeletePostProps = {
  postId: string | null;
};
const DeletePost = ({ postId }: DeletePostProps) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    postId !== null && dispatch<any>(deletePostAsync(postId));
  };

  return (
    <Modal id="delete" className={`text-[1.6rem] min-w-[50rem] pt-12 pb-8 `}>
      <div className="text-black">
        <h3 className="text-4xl font-bold mb-4 flex gap-3 items-center">
          Delete Post <SlTrash className="text-orange " />
        </h3>
        <p className="font-medium">Are you sure to DELETE this post?</p>
      </div>
      <div>
        <div className="modal-action ">
          <form method="dialog">
            <button className="btn text-[1.6rem] p-7 content-center">
              Cancel
            </button>
          </form>
          <SubmitButton onClick={handleDelete}>Delete</SubmitButton>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePost;
