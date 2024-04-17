import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";
import {
    showCourseTeacherAddSuccess,
    showError,
    showUnauthorizedError, showUserIsAlreadyStudent, showUserIsAlreadyTeacher
} from "../../utils/messageHandler.js";

export const axiosCourseTeacherAdd = async (courseId, teacherId) => {
    try {
        const response = await api.post(API_URLS.COURSE + courseId + API_URLS.COURSE_TEACHERS, {userId: teacherId});
        showCourseTeacherAddSuccess();
        return response;
    }
    catch (error) {
        const errorMessage = error.response.data.message;

        if (error.response.status === 401) {
            showUnauthorizedError();
        }
        else if (errorMessage === "This user is already teaching at this course.") {
            showUserIsAlreadyTeacher();
        }
        else if (errorMessage === "Cannot assign teacher role to a student already attending the course.") {
            showUserIsAlreadyStudent();
        }
        else {
            showError(error.response.data.message)
        }
        throw error;
    }
}