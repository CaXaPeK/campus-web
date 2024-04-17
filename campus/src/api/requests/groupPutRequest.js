import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";
import {
    showError,
    showGroupRenameSuccess,
    showUnauthorizedError
} from "../../utils/messageHandler.js";

export const axiosGroupPut = async (id, newName) => {
    try {
        const response = await api.put(API_URLS.GROUPS + '/' + id, { name: newName });
        showGroupRenameSuccess();
        return response;
    }
    catch (error) {
        if (error.response.status === 401) {
            showUnauthorizedError();
        }
        else {
            showError(error.response.data.message);
        }
        throw error;
    }
}