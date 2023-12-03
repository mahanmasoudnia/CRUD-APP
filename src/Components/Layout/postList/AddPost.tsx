import React, { useEffect, useCallback, useState } from "react";
import Modal from "../../Common/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState } from "@/store";
import { submitNewPostAsync } from "@/Redux/addNewPost/addNewPostSlice";
import { AuthorsListAsync } from "@/Redux/authorsList/authorsList";
import SubmitButton from "../../Common/Button/Button";
interface AuthorsList {
  id: number;
  name: string;
}
const AddPost = () => {
  const dispatch = useDispatch();
  const { title, content, userId } = useSelector(
    (state: RootState) => state.AddNewPostSlice,
  ); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title || "",
      content: content || "",
      userId: userId || "",
    },
  });

  const onSubmit = (data: {
    title: string;
    content: string;
    userId: string;
  }) => {
    dispatch<any>(submitNewPostAsync(data)).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
        reset();
      }
    });
  };

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
      <Modal className="p-10" id="add">
        <h3 className="text-4xl font-bold mb-4 flex gap-3 items-center">
          Add New Post
        </h3>
        <div className="modal-action">
          <form
            className="text-[1.6rem] w-full form-control gap-3 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="label font-semibold">
                <span className="">Title</span>
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
                <span className="">Content</span>
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
              <label className="label font-semibold">
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
              Send Your Post
            </SubmitButton>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddPost;
