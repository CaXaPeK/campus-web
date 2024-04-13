import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";
import {
    showCourseEditSuccess,
    showError,
    showUnauthorizedError
} from "../../utils/messageHandler.js";

export const axiosCourseEdit = async (courseId, name, startYear, maximumStudentsCount, semester, requirements, annotations) => {
    const data = {
        name: name,
        startYear: startYear,
        maximumStudentsCount: maximumStudentsCount,
        semester: semester,
        requirements: requirements,
        annotations: annotations
    }

    try {
        const response = await api.put(API_URLS.COURSE + courseId, data);
        console.log(response);
        showCourseEditSuccess();
        return response;
    }
    catch (error) {
        if (error.response.status == 401) {
            showUnauthorizedError();
        }
        else {
            showError(error.response.data.title)
        }
        console.log(error)
        throw error;
    }
}