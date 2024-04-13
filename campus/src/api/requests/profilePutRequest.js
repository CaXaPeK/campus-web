import { API_URLS } from "../../constants/apiUrls"
import { showError, showProfileEditSuccess, showUnauthorizedError } from "../../utils/messageHandler";
import { api } from "../axiosInstance"

export const axiosProfilePut = async (fullName, birthDate) => {
    const data = {
        fullName: fullName,
        birthDate: birthDate
    };

    try {
        await api.put(API_URLS.PROFILE, data);
        showProfileEditSuccess();
    }
    catch (error) {
        if (error.response.status == 401) {
            showUnauthorizedError();
        }
        else {
            showError(error.response.data.message);
        }
    }
}