import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");

axios.defaults.headers.common["Authorization"] = token ? "JWT" + token : null;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use(null, (error) => {
  const originalRequest = error.config;
  const expectedErr =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErr) {
    toast.error("Server Problem", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }
  if (error.response.status === 401) {
    // window.location.href = "/login";
    localStorage.removeItem("token");
    toast.error("Sign in Again", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
    });
    return Promise.reject(error);
  }
  if (token) {
    const decodeToken = jwtDecode(token);
    const date_now = Math.ceil(Date.now() / 1000);
    if (decodeToken && decodeToken.exp && decodeToken.exp < date_now) {
      // window.location.href = "/login";

      toast.warning("Sign in Again", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }
});
export default {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
