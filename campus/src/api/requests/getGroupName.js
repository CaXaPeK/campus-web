import {api} from "../axiosInstance.js";
import {API_URLS} from "../../constants/apiUrls.js";

export const getGroupName = async (groupId, setGroupName) => {
    try {
        const response = await api.get(API_URLS.GROUPS);
        const name = response.data.find(group => group.id === groupId).name;
        setGroupName(name);
        document.title = name;
    }
    catch (error) {
        throw null;
    }
}