
import {

    GET_TOKEN_REQUEST,
    GET_TOKEN_SUCCEEDED,
    GET_TOKEN_FAILED,

    VERIFY_REQUEST,
    VERIFY_SUCCEEDED,
    VERIFY_FAILED,

    AUTHORIZE_REQUEST,
    AUTHORIZE_SUCCEEDED,
    AUTHORIZE_FAILED,

    DISPOSE_REQUEST,
    DISPOSE_SUCCEEDED,
    DISPOSE_FAILED,

} from '../../actions/AuthActions/actionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { Api } from '../Api'
import { START_LOADING, STOP_LOADING, SHOW_ERROR_ALERT } from '../../actions/AppActions/actionTypes';
import { showErrorAlertAction } from '../../actions/AppActions/actionCreators';
import { Config } from '../../utilities/Config';
import { setObjectToken } from '../../utilities/Helper';
import I18n from '../../I18n';
import { navigateToStatusInfoScreenAction } from '../../actions/NavigationActions/actionCreators';
import { authorizeRequestAction } from '../../actions/AuthActions/actionCreators';
import { Platform } from 'react-native';


function* authorize(action) {
    try {
        yield put({ type: START_LOADING })
        const receivedDataTemp = yield Api.authorize(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        if (receivedData && receivedData.ReturnValue) {
            console.log("__a__", receivedData);
            yield put({ type: STOP_LOADING })
            yield put({ type: AUTHORIZE_SUCCEEDED, payload: receivedData })
            yield put(navigateToStatusInfoScreenAction())
        } else {
            console.log("__b__", receivedData);
            yield put({ type: STOP_LOADING })
            yield put({ type: AUTHORIZE_FAILED, payload: receivedData})
        }
    } catch (error) {
        yield put({ type: STOP_LOADING })
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: AUTHORIZE_FAILED, error })
    }
}

function* getToken(action) {
    var form = action.payload;
    try {
        yield put({ type: START_LOADING })
        const receivedData = yield Api.getToken(action.payload)
        console.log("__token__",receivedData);
        if (receivedData !== null) {
            yield put({ type: STOP_LOADING })
            yield put({ type: GET_TOKEN_SUCCEEDED, payload: receivedData })
            // console.log("__setObjectToken__",receivedData.Items[0]);
            Config.objectToken = receivedData.Items[0];
            yield setObjectToken(receivedData.Items[0])
            yield put(authorizeRequestAction({
                Par: `managed_url=${form.managed_url}&user=${form.user}&password=${form.password}&fcm_token=${Config.fcmToken}&os_type=${Platform.OS}`
              }))
        } else {
            yield put({ type: STOP_LOADING })
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
            yield put({ type: GET_TOKEN_FAILED, payload: {}})
        }
    } catch (error) {
        yield put({ type: STOP_LOADING })
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: GET_TOKEN_FAILED, error })
    }
}

function* verify(action) {
    try {
        yield put({ type: START_LOADING })
        const receivedDataTemp = yield Api.verify(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        if (receivedData && receivedData.ReturnValue) {
            yield put({ type: STOP_LOADING })
            yield put({ type: VERIFY_SUCCEEDED, payload: receivedData })
            yield put(navigateToStatusInfoScreenAction())
        } else {
            yield put({ type: STOP_LOADING })
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: receivedData.ReturnMsg }))
            yield put({ type: VERIFY_FAILED, payload: receivedData})
        }
    } catch (error) {
        console.log(error);
        yield put({ type: STOP_LOADING })
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: VERIFY_FAILED, error })
    }
}

function* dispose(action) {
    try {
        const receivedDataTemp = yield Api.dispose(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        // alert(JSON.stringify(receivedData));
        if (receivedData && receivedData.ReturnValue) {
            yield put({ type: DISPOSE_SUCCEEDED, payload: receivedData })
        } else {
            yield put({ type: DISPOSE_FAILED, payload: receivedData})
        }
    } catch (error) {
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: DISPOSE_FAILED, error })
    }
}


export function* watchAuthorize() {
    yield takeLatest(AUTHORIZE_REQUEST, authorize)
}

export function* watchGetToken() {
    yield takeLatest(GET_TOKEN_REQUEST, getToken)
}

export function* watchVerify() {
    yield takeLatest(VERIFY_REQUEST, verify)
}

export function* watchDispose() {
    yield takeLatest(DISPOSE_REQUEST, dispose)
}

