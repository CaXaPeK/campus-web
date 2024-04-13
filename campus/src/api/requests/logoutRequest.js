import { API_URLS } from "../../constants/apiUrls";
import { ROUTES } from "../../constants/routes";
import { showAlreadyLoggedOut, showError } from "../../utils/messageHandler"
import { api } from "../axiosInstance";

export const axiosLogout = async () => {
    if (localStorage.getItem('token') == null) {
        showAlreadyLoggedOut();
        return;
    }

    try {
        await api.post(API_URLS.LOGOUT);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('isStudent');
        localStorage.removeItem('isTeacher');
        localStorage.removeItem('isAdmin');
        window.location.href = ROUTES.ROOT;
    }
    catch (error) {
        if (error.response.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('isStudent');
            localStorage.removeItem('isTeacher');
            localStorage.removeItem('isAdmin');
            window.location.href = ROUTES.ROOT;
        }

        showError(error.response.data.message);
    }
}