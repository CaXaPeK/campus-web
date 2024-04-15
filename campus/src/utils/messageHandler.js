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

export const showUserIsAlreadyTeacher = () => {
    showError(ERROR_MESSAGES.USER_IS_ALREADY_TEACHER);
}

export const showUserIsAlreadyStudent = () => {
    showError(ERROR_MESSAGES.USER_IS_ALREADY_STUDENT);
}

export const showCantAssignPreviousStatus = () => {
    showError(ERROR_MESSAGES.CANT_ASSIGN_PREVIOUS_STATUS);
}

export const showCantEditStudentStatus = () => {
    showError(ERROR_MESSAGES.CANT_EDIT_STUDENT_STATUS);
}

export const showUserAlreadySignedUp = () => {
    showError(ERROR_MESSAGES.USER_ALREADY_SIGNED_UP);
}

export const showMaximumStudentsCountReached = () => {
    showError(ERROR_MESSAGES.MAXIMUM_STUDENTS_COUNT_REACHED);
}

export const showUnauthorizedError = () => {
    showError(ERROR_MESSAGES.UNAUTHORIZED);
}

export const showElementNotFound = () => {
    showError(ERROR_MESSAGES.ELEMENT_NOT_FOUND);
}

export const showGroupNotFound = () => {
    showError(ERROR_MESSAGES.GROUP_NOT_FOUND);
}

export const showCourseNotFound = () => {
    showError(ERROR_MESSAGES.COURSE_NOT_FOUND);
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

export const showCourseDeleteSuccess = () => {
    showSuccess(ERROR_MESSAGES.COURSE_DELETE_SUCCESS);
}

export const showCourseStatusEditSuccess = () => {
    showSuccess(ERROR_MESSAGES.COURSE_STATUS_EDIT_SUCCESS);
}

export const showCourseNotificationCreateSuccess = () => {
    showSuccess(ERROR_MESSAGES.COURSE_NOTIFICATION_CREATE_SUCCESS);
}

export const showCourseTeacherAddSuccess = () => {
    showSuccess(ERROR_MESSAGES.COURSE_TEACHER_ADD_SUCCESS);
}

export const showCourseStudentMarkEditSuccess = () => {
    showSuccess(ERROR_MESSAGES.COURSE_STUDENT_MARK_EDIT_SUCCESS);
}

export const showCourseSignUpSuccess = () => {
    showSuccess(ERROR_MESSAGES.COURSE_SIGNUP_SUCCESS);
}

export const showCourseStudentStatusEditSuccess = () => {
    showSuccess(ERROR_MESSAGES.COURSE_STUDENT_STATUS_EDIT_SUCCESS);
}