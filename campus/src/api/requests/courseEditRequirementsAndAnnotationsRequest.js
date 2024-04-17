import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";
import {showCourseEditSuccess, showError, showUnauthorizedError} from "../../utils/messageHandler.js";

export const axiosCourseRequirementsAndAnnotationsEdit = async (courseId, requirements, annotations) => {
    const data = {
        requirements: requirements,
        annotations: annotations
    }

    try {
        const response = await api.put(API_URLS.COURSE + courseId + API_URLS.COURSE_REQUIREMENTS_AND_ANNOTATIONS, data);
        showCourseEditSuccess();
        return response;
    }
    catch (error) {
        if (error.response.status === 401) {
            showUnauthorizedError();
        }
        else {
            showError(error.response.data.message)
        }
        throw error;
    }
}