import {api} from "./axiosInstance.js";
import {showElementNotFound, showUnauthorizedError} from "../utils/messageHandler.js";

export const fetchGetApi = async (url, setData, setLoading, setAuthorized, setError, stub, notifyAuthorized) => {
    setLoading(true);
    const params = window.location.search;
    try {
        const response = await api.get(url + params);
        setData(response.data);
        setLoading(false);
        setAuthorized(true);
    }
    catch (error) {
        setLoading(false);
        setData(stub);
        setError(error);
        setAuthorized(false);

        if (error.response.status == 401 && notifyAuthorized) {
            showUnauthorizedError();
        }

        if (error.response.status == 404) {
            showElementNotFound();
        }

        throw error;
    }
}