import {
    START_LOADING,
    STOP_LOADING,

    SHOW_SUCCESS_ALERT,
    SHOW_ERROR_ALERT,
    HIDE_INFO_DIALOG,
    SHOW_INFO_DIALOG,
} from "./actionTypes";

const startLoadingAction = () => ({
    type: START_LOADING
});
const stopLoadingAction = () => ({
    type: STOP_LOADING
});

const showSuccessAlertAction = ({ title, description }) => ({
    type: SHOW_SUCCESS_ALERT,
    payload: { title, description }
});

const showErrorAlertAction = ({ title, description }) => ({
    type: SHOW_ERROR_ALERT,
    payload: { title, description }
});

const showInfoDialogAction = params => ({
    type: SHOW_INFO_DIALOG,
    payload: params
});

const hideInfoDialogAction = params => ({
    type: HIDE_INFO_DIALOG,
    payload: params
});

export {
    startLoadingAction,
    stopLoadingAction,

    showSuccessAlertAction,
    showErrorAlertAction,

    showInfoDialogAction,
    hideInfoDialogAction
};
