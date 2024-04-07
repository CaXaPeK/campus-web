import { message } from "antd";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export const showError = (text) => {
    message.open({
        type: 'error',
        content: text,
        style: {marginTop: 60},
        duration: 2
    });
}

export const showSuccess = (text) => {
    message.open({
        type: 'success',
        content: text,
        style: {marginTop: 60},
        duration: 2
    });
}

export const showLoginFailed = () => {
    showError(ERROR_MESSAGES.LOGIN_FAILED);
}

export const showEmailTaken = () => {
    showError(ERROR_MESSAGES.EMAIL_TAKEN);
}

export const showUnauthorizedError = () => {
    showError(ERROR_MESSAGES.UNAUTHORIZED);
}

export const showProfileEditSuccess = () => {
    showSuccess(ERROR_MESSAGES.PROFILE_EDIT_SUCCESS);
}