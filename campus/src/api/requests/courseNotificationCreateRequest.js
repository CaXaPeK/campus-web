import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";
import {
    showCourseNotificationCreateSuccess,
    showError,
    showUnauthorizedError
} from "../../utils/messageHandler.js";

export const axiosCourseNotificationCreate = async (id, text, isImportant) => {
    try {
        const response = await api.post(API_URLS.COURSE + id + API_URLS.COURSE_NOTIFICATIONS, {text: text, isImportant: isImportant});
        showCourseNotificationCreateSuccess();
        return response;
    }
    catch (error) {
        if (error.response.status === 401) {
            showUnauthorizedError();
        }
        else {
            console.log(error)
            showError(error.response.data.message)
        }
        throw error;
    }
}