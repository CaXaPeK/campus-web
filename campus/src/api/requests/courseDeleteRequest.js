import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";
import {
    showCourseDeleteSuccess, showCourseNotFound,
    showError,
    showUnauthorizedError
} from "../../utils/messageHandler.js";

export const axiosCourseDelete = async (id) => {
    try {
        const response = await api.delete(API_URLS.COURSE + id);
        showCourseDeleteSuccess();
        return response;
    }
    catch (error) {
        if (error.response.status == 401) {
            showUnauthorizedError();
        }
        else if (error.response.status == 404) {
            showCourseNotFound();
        }
        else {
            showError(error.response.data.title)
        }
        throw error;
    }
}