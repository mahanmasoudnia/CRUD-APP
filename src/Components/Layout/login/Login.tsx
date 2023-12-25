import React from "react";
import { useForm } from "react-hook-form";
import shatelLogo from "@/assets/img/Shatel_Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { loginAsync } from "@/Redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await dispatch<any>(loginAsync(data));
      if (loginAsync.fulfilled.match(response)) {
        const token = localStorage.getItem("token");
        token && navigate("/");
        console.log();
      } else {
        console.log("Login failed:", response.payload);
        toast.error("Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full text-[1.6rem]">
      <div className="flex w-1/2 h-fit p-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
        <div className="w-1/2 mx-auto my-8">
          <h1 className="font-bold text-5xl mb-10">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700  font-bold mb-2"
                htmlFor="username"
              >
                Username:
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                type="text"
                id="username"
                name="username"
                className={`border rounded w-full py-2 px-3 ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
              {errors.username && (
                <p className="text-red-500  mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700  font-bold mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                id="password"
                name="password"
                className={`border rounded w-full py-2 px-3 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              disabled={loading === "pending" ? true : false}
              type="submit"
              className="w-full justify-center mt-16 bg-indigo-900 hover:bg-indigo-950 active:bg-indigo-800 transition-all text-white font-bold py-2 px-4 rounded flex items-center "
            >
              {loading === "pending" ? (
                <>
                  {" "}
                  <span className="loading loading-bars loading-sm text-white z-10"></span>{" "}
                  Logging in
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
    
      </div>
    </div>
  );
};

export default Login;
