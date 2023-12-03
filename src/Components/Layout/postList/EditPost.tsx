import React, { useEffect, useCallback, useState } from "react";
import Modal from "../../Common/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState } from "@/store";
import { editNewPostAsync } from "@/Redux/addNewPost/addNewPostSlice";
import { AuthorsListAsync } from "@/Redux/authorsList/authorsList";
import SubmitButton from "@/Components/Common/Button/Button";
type EditPostProps = {
  post?: {
    id?: number;
    title?: string;
    date?: string;
    content?: string;
    userId?: string;
    author?: string;
  };
};
interface AuthorsList {
  id: number;
  name: string;
}
const EditPost = ({ post }: EditPostProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: post?.id || 0,
      title: post?.title || "",
      content: post?.content || "",
      userId: post?.userId || "",
      date: Date.now() || "",
    },
  });

  const onSubmit = (data: {
    id: number;
    title: string;
    content: string;
    userId: string;
    date: string | number | undefined;
  }) => {
    dispatch<any>(editNewPostAsync(data));
    console.log("submit", data);
  };

  useEffect(() => {
    setValue("id", post?.id || 0);
    setValue("title", post?.title || "");
    setValue("content", post?.content || "");
    setValue("userId", post?.userId || "");
  }, [post]);

  const getAuthorsList = useCallback(() => {
    dispatch<any>(AuthorsListAsync());
  }, [dispatch]);

  useEffect(() => {
    getAuthorsList();
  }, [getAuthorsList]);
  const authorsList = useSelector(
    (state: RootState) => (state.AuthorsList.Authors as AuthorsList[]) || [],
  );
  return (
    <>
      <Modal className="p-10 " id="edit">
        <h3 className="text-4xl font-bold mb-4 flex gap-3 items-center text-black">
          Add New Post
        </h3>
        <div className="modal-action">
          <form
            className="text-[1.6rem] w-full form-control gap-3 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="label font-semibold">
                <span className=" text-black">Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input w-full input-bordered text-[1.6rem]"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-red-600 text-xl">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div>
              <label className="label font-semibold">
                <span className=" text-black">Content</span>
              </label>
              <input
                type="text"
                placeholder="Content"
                className="input w-full input-bordered text-[1.6rem]"
                {...register("content", { required: "Content is required" })}
              />
              {errors.content && (
                <span className="text-red-600 text-xl">
                  {errors.content.message}
                </span>
              )}
            </div>
            <div>
              <label className="label text-black font-semibold">
                <span className="">Select Your Author</span>
              </label>
              <select
                className=" select select-bordered min-w-full max-w-xs text-[1.6rem]"
                {...register("userId", { required: "Author is required" })}
              >
                <option disabled selected value={""}>
                  Who Write This?
                </option>
                {authorsList?.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
              <br />
              {errors.userId && (
                <span className="text-red-600 text-xl">
                  {errors.userId.message}
                </span>
              )}
            </div>
            <SubmitButton type="submit" className="   mt-[3rem] rounded-full ">
              Edit Your Post
            </SubmitButton>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditPost;
