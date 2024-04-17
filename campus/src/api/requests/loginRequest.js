import { API_URLS } from "../../constants/apiUrls";
import { api } from "../axiosInstance"
import { showLoginFailed, showError } from "../../utils/messageHandler";

export const axiosLogin = async (email, password) => {
    const data = {
        email: email,
        password: password
    };
  
    try {
        const token = await api.post(API_URLS.LOGIN, data);
        localStorage.setItem("token", token.data.token);
        localStorage.setItem("email", data.email);

        window.location.href = "/";
    } catch (error) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "Login failed") {
            showLoginFailed();
        }
        else {
            showError(errorMessage);
        }

        throw error;
    }
  };