import axios from "axios";
import { API_URLS } from "../constants/apiUrls";

export const api = axios.create({
    baseURL: API_URLS.BASE,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
});