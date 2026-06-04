import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth/admin";
const LOGIN = "/login";
const FORGOT_PASSWORD = "/forgot-password";
const VERIFY_OTP = "/verify-OTP";
const CHANGE_PASSWORD = "/change-password"

export const adminLogin = async (data: any) => {
    try {
        const res = await axios.post(BASE_URL + LOGIN, data);

        return res.data;
    } catch (error) {
        console.log("Admin login error : ", error);
    }
}

export const adminForgotPassword = async (email: any) => {
    try {
        const res = await axios.post(BASE_URL + FORGOT_PASSWORD, email);

        return res.data;
    } catch (error) {
        console.log("Admin forgot password error : ", error);
    }
}

export const adminVerifyOTP = async (OTP: any) => {
    try {
        const email = sessionStorage.getItem('email') || "";

        const res = await axios.post(BASE_URL + VERIFY_OTP, { OTP: Number(OTP), email });

        return res.data;
    } catch (error) {
        console.log("Admin verify otp error : ", error);
    }
}

export const adminChangePassword = async (new_password: any) => {
    try {
        const email = sessionStorage.getItem('email') || "";

        const res = await axios.post(BASE_URL + CHANGE_PASSWORD, { new_password, email });

        return res.data;
    } catch (error) {
        console.log("Admin verify otp error : ", error);
    }
}

export const resendOTPfunc = async () => {
    try {
        const email = sessionStorage.getItem('email') || "";

        const res = await axios.post(BASE_URL + FORGOT_PASSWORD, email);

        return res.data;
    } catch (error) {
        console.log("Resend OTP error : ", error)
    }
}