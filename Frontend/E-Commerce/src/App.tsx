import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";

export default function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    if (token)
      navigate('/dashboard');
    else
      navigate('/login');

  }, []);

  return (
    <div>
      <ToastContainer />

      <Outlet />
    </div>
  )
}
