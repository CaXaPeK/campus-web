import { API_URLS } from "../../constants/apiUrls";
import { ROUTES } from "../../constants/routes";
import { showAlreadyLoggedOut, showError } from "../../utils/messageHandler"
import { api } from "../axiosInstance";
import {useDispatch} from "react-redux";
import {changeIsAdmin, changeIsStudent, changeIsTeacher} from "../../redux/userReducer.js";

export const axiosLogout = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();

    if (localStorage.getItem('token') == null) {
        showAlreadyLoggedOut();
        return;
    }

    try {
        await api.post(API_URLS.LOGOUT);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        dispatch(changeIsStudent(false));
        dispatch(changeIsTeacher(false));
        dispatch(changeIsAdmin(false));

        window.location.href = ROUTES.ROOT;
    }
    catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            dispatch(changeIsStudent(false));
            dispatch(changeIsTeacher(false));
            dispatch(changeIsAdmin(false));

            window.location.href = ROUTES.ROOT;
        }

        showError(error.response.data.message);

        throw error;
    }
}