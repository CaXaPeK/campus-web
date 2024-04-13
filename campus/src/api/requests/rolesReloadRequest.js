import {useDispatch, useSelector} from "react-redux";
import {api} from "../axiosInstance.js";
import {showUnauthorizedError} from "../../utils/messageHandler.js";
import {changeIsStudent, changeIsTeacher, changeIsAdmin} from "../../redux/userReducer.js";
import {API_URLS} from "../../constants/apiUrls.js";

export const axiosRolesReload = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();

    try {
        const response = await api.get(API_URLS.ROLES);
        dispatch(changeIsStudent(response.data.isStudent));
        dispatch(changeIsTeacher(response.data.isTeacher));
        dispatch(changeIsAdmin(response.data.isAdmin));
    }
    catch (error) {
        
    }
}