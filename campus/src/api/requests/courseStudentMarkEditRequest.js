import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";
import {
    showCourseStudentMarkEditSuccess, showError,
    showUnauthorizedError
} from "../../utils/messageHandler.js";

export const axiosCourseStudentMarkEdit = async (courseId, studentId, markType, markStatus) => {
    try {
        const response = await api.post(API_URLS.COURSE + courseId + API_URLS.COURSE_MARKS + '/' + studentId, {markType: markType, mark: markStatus});
        showCourseStudentMarkEditSuccess();
        return response;
    }
    catch (error) {
        const errorMessage = error.response.data.message;

        if (error.response.status == 401) {
            showUnauthorizedError();
        }
        //else if (errorMessage == "Course status cannot be changed to a previous one.") {
        //    showCantAssignPreviousStatus();
        //}
        else {
            showError(errorMessage)
        }
        throw error;
    }
}