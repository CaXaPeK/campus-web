import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";
import {showError, showGroupCreateSuccess, showUnauthorizedError} from "../../utils/messageHandler.js";

export const axiosCoursePost = async (groupId, name, startYear, maximumStudentsCount, semester, requirements, annotations, mainTeacherId) => {
    const data = {
        name: name,
        startYear: startYear,
        maximumStudentsCount: maximumStudentsCount,
        semester: semester,
        requirements: requirements,
        annotations: annotations,
        mainTeacherId: mainTeacherId
    }

    try {
        console.log(data)
        const response = await api.post(API_URLS.GROUPS + '/' + groupId, data);
        showGroupCreateSuccess();
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