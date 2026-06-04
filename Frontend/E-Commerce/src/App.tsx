import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { allRoutes } from "./router/routes";

export default function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    if (token)
      navigate(allRoutes.dashboard);
    else
      navigate(allRoutes.login);

  }, []);

  return (
    <div>
      <ToastContainer />

      <Outlet />
    </div>
  )
}
