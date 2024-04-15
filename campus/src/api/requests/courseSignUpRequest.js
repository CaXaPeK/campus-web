import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";
import {
    showCourseSignUpSuccess,
    showError,
    showUnauthorizedError, showUserAlreadySignedUp
} from "../../utils/messageHandler.js";

export const axiosCourseSignUp = async (id) => {
    try {
        const response = await api.post(API_URLS.COURSE + id + API_URLS.COURSE_SIGNUP);
        showCourseSignUpSuccess();
        return response;
    }
    catch (error) {
        const errorMessage = error.response.data.message;

        if (error.response.status == 401) {
            showUnauthorizedError();
        }
        else if (errorMessage === "User is already signed up for this course.") {
            showUserAlreadySignedUp();
        }
        else {
            showError(errorMessage)
        }
        throw error;
    }
}