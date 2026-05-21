import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth/admin";
const LOGIN = "/login";
const FORGOT_PASSWORD = "/forgot-password";

export const adminLogin = async (data: any) => {
    const res = await axios.post(BASE_URL + LOGIN, data);

    return res.data;
}

export const adminForgotPassword = async (email: any) => {
    const res = await axios.post(BASE_URL + FORGOT_PASSWORD, email);

    return res.data;
}