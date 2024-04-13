import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";
import {
    showCourseStatusEditSuccess,
    showError,
    showUnauthorizedError
} from "../../utils/messageHandler.js";

export const axiosCourseStatusEdit = async (id, status) => {
    try {
        const response = await api.post(API_URLS.COURSE + id + API_URLS.COURSE_STATUS, {status: status});
        showCourseStatusEditSuccess();
        return response;
    }
    catch (error) {
        if (error.response.status == 401) {
            showUnauthorizedError();
        }
        else {
            console.log(error)
            showError(error.response.data.message)
        }
        throw error;
    }
}