import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";
import {
    showError,
    showGroupDeleteSuccess, showGroupNotFound,
    showUnauthorizedError
} from "../../utils/messageHandler.js";

export const axiosGroupDelete = async (id) => {
    try {
        const response = await api.delete(API_URLS.GROUPS + '/' + id);
        showGroupDeleteSuccess();
        return response;
    }
    catch (error) {
        if (error.response.status == 401) {
            showUnauthorizedError();
        }
        else if (error.response.status == 404) {
            showGroupNotFound();
        }
        else {
            showError(error.response.data.title)
        }
        throw error;
    }
}