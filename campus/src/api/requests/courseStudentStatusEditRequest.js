import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";
import {
    showCantEditStudentStatus, showCourseStudentStatusEditSuccess,
    showError,
    showUnauthorizedError
} from "../../utils/messageHandler.js";

export const axiosCourseStudentStatusEdit = async (courseId, studentId, newStatus) => {
    console.log(API_URLS.COURSE + courseId + API_URLS.COURSE_STUDENT_STATUS + '/' + studentId);
    try {
        const response = await api.post(API_URLS.COURSE + courseId + API_URLS.COURSE_STUDENT_STATUS + '/' + studentId, {status: newStatus});
        console.log({status: newStatus});
        showCourseStudentStatusEditSuccess();
        return response;
    }
    catch (error) {
        const errorMessage = error.response.data.message;

        if (error.response.status == 401) {
            showUnauthorizedError();
        }
        else if (errorMessage === "This student is not in queue. Their status cannot be changed.") {
            showCantEditStudentStatus();
        }
        else {
            showError(errorMessage)
        }
        throw error;
    }
}