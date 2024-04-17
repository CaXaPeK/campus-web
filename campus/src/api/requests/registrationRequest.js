import { API_URLS } from "../../constants/apiUrls";
import { api } from "../axiosInstance"
import { showError, showEmailTaken } from "../../utils/messageHandler";

export const axiosRegistration = async (fullName, birthDate, email, password, confirmPassword) => {
    const data = {
        fullName: fullName,
        birthDate: birthDate,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    };

    const loginData = {
        email: email,
        password: password,
    }

    try {
        await api.post(API_URLS.REGISTRATION, data);
        const token = await api.post(API_URLS.LOGIN, loginData);
        localStorage.setItem("token", token.data.token);
        localStorage.setItem("email", data.email);
        window.location.href = "/";
    } catch (error) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "User with this email is already registered.") {
            showEmailTaken();
        }
        else {
            showError(errorMessage);
        }

        throw error;
    }
}