import { API_URLS } from "../../constants/apiUrls";
import { api } from "../axiosInstance"
import { showLoginFailed, showError } from "../../utils/messageHandler";

export const axiosLogin = async (email, password) => {
    const data = {
        email: email,
        password: password
    };

    console.log(data);
  
    try {
        const token = await api.post(API_URLS.LOGIN, data);
        localStorage.setItem("token", token.data.token);
        console.log(token.data.token);
        window.location.href = "/";
    } catch (error) {
        var errorMessage = error.response.data.message;
        if (errorMessage == "Login failed") {
            showLoginFailed();
        }
        else {
            errorMessage = error.response.data.title;
            showError(errorMessage);
        }
      }
  };