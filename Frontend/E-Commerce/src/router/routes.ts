import { createBrowserRouter } from "react-router";
import App from "../App";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/dashboardPage";
import AuthLayout from "../pages/auth/AuthLayout";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                Component: AuthLayout,
                children: [
                    {
                        path: 'login',
                        Component: LoginPage
                    },
                    {
                        path: 'forgot-password',
                        Component: ForgotPasswordPage
                    }
                ]
            },
            {
                path: 'dashboard',
                Component: DashboardPage
            }
        ]
    }
])