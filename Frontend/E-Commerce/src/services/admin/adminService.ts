import axios from "axios";
import type { adminDataType } from "../../pages/admin/addAdminPage";

const BASE_URL = "http://localhost:8080/api/auth/admin";
const REGISTER = "/register";

export const getToken = () => {
    return localStorage.getItem("authToken") || "";
}

export const addAdmin = async (data: adminDataType) => {
    try {
        const formData = new FormData();

        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("phone", data.phone);

        if (data.profile_image !== null) {
            formData.append("profile_image", data.profile_image);
        }

        const res = await axios.post(BASE_URL + REGISTER, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        return res.data;
    } catch (error) {
        console.log("Add admin error : ", error);
    }
}