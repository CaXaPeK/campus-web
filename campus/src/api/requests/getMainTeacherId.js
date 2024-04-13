import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";

export const getMainTeacherId = async (mainTeacherEmail, setMainTeacherId) => {
    try {
        const response = await api.get(API_URLS.USERS);
        const id = response.data.find(user => user.email === mainTeacherEmail).id;
        setMainTeacherId(id);
    }
    catch (error) {
        throw null;
    }
}