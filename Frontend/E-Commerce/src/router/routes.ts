import { createBrowserRouter } from "react-router";
import App from "../App";
import LoginPage from "../pages/auth/LoginPage";
import AuthLayout from "../layouts/AuthLayout";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import VerifyOtpPage from "../pages/auth/VerifyOTPPage";
import NewPasswordPage from "../pages/auth/NewPasswordPage";
import MainLayout from "../layouts/MainLayout";
import addAdminPage from "../pages/admin/addAdminPage";

export const allRoutes = {
    login: "/login",
    forgot_password: "/forgot-password",
    verify_otp: "/verify-otp",
    change_password: "/change-password",
    dashboard: "/dashboard",
    add_admin: "add-admin"
}

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                Component: AuthLayout,
                children: [
                    {
                        path: allRoutes.login,
                        Component: LoginPage
                    },
                    {
                        path: allRoutes.change_password,
                        Component: ForgotPasswordPage
                    },
                    {
                        path: allRoutes.verify_otp,
                        Component: VerifyOtpPage
                    },
                    {
                        path: allRoutes.change_password,
                        Component: NewPasswordPage
                    }
                ]
            },
            {
                path: allRoutes.dashboard,
                Component: MainLayout,
                children: [
                    {
                        index: true,
                        Component: DashboardPage
                    },
                    {
                        path: allRoutes.add_admin,
                        Component: addAdminPage
                    }
                ]
            }
        ]
    }
])