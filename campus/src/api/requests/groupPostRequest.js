import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";
import {
    showError,
    showGroupCreateSuccess,
    showUnauthorizedError
} from "../../utils/messageHandler.js";

export const axiosGroupPost = async (name) => {
    try {
        const response = await api.post(API_URLS.GROUPS, { name: name });
        showGroupCreateSuccess();
        return response;
    }
    catch (error) {
        if (error.response.status === 401) {
            showUnauthorizedError();
        }
        else {
            showError(error.response.data.message)
        }
        throw error;
    }
}