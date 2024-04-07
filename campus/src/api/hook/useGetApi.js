import { useEffect, useState } from "react"
import { api } from "../axiosInstance";
import { showUnauthorizedError } from "../../utils/messageHandler";

export const useGetApi = (stub, url) => {
    const [data, setData] = useState(stub);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState(null);
    const params = window.location.search;

    useEffect(() => {
        const fetch = async () => {
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

                if (error.response.status == 401) {
                    showUnauthorizedError();
                }
            }
        };

        fetch();
    }, []);

    return [data, loading, authorized, error];
}