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

export const showGroupNotFound = () => {
    showError(ERROR_MESSAGES.GROUP_NOT_FOUND);
}

export const showAlreadyLoggedOut = () => {
    showError(ERROR_MESSAGES.ALREADY_LOGGED_OUT);
}

export const showProfileEditSuccess = () => {
    showSuccess(ERROR_MESSAGES.PROFILE_EDIT_SUCCESS);
}

export const showGroupRenameSuccess = () => {
    showSuccess(ERROR_MESSAGES.GROUP_RENAME_SUCCESS);
}

export const showGroupCreateSuccess = () => {
    showSuccess(ERROR_MESSAGES.GROUP_CREATE_SUCCESS);
}

export const showGroupDeleteSuccess = () => {
    showSuccess(ERROR_MESSAGES.GROUP_DELETE_SUCCESS);
}

export const showCourseCreateSuccess = () => {
    showSuccess(ERROR_MESSAGES.COURSE_CREATE_SUCCESS);
}

export const showCourseEditSuccess = () => {
    showSuccess(ERROR_MESSAGES.COURSE_EDIT_SUCCESS);
}