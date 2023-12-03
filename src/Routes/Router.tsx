import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import Login from "../Components/Layout/login/Login";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Home from "../Pages/Home/Home";

function Router() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    !token && navigate("/login");
  }, [token]);

  return (
    <Routes location={location}>
      {!token ? (
        <Route index path="/login" element={<Login />} />
      ) : (
        <Route path="/login" element={<Navigate replace to="/" />} />
      )}
      {token && <Route path="/" element={<Home />} />}
      <Route key={"*"} path="*" element={<>404 not</>} />
    </Routes>
  );
}

export default Router;
