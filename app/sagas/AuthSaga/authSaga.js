
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

} from '../../actions/AuthActions/actionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { Api } from '../Api'
import { START_LOADING, STOP_LOADING, SHOW_ERROR_ALERT } from '../../actions/AppActions/actionTypes';
import { showErrorAlertAction } from '../../actions/AppActions/actionCreators';
import { Config } from '../../utilities/Config';
import { setObjectToken } from '../../utilities/Helper';
import I18n from '../../I18n';
import { navigateToStatusInfoScreenAction } from '../../actions/NavigationActions/actionCreators';
import { getTokenRequestAction } from '../../actions/AuthActions/actionCreators';


function* authorize(action) {
    try {
        yield put({ type: START_LOADING })
        const receivedDataTemp = yield Api.authorize(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        console.log("__haha__",receivedData);
        if (receivedData && receivedData.ReturnValue) {
            yield put({ type: AUTHORIZE_SUCCEEDED, payload: receivedData })
            yield put({ type: STOP_LOADING })
            yield put(navigateToStatusInfoScreenAction())
        } else {
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: receivedData.ReturnMsg }))
            yield put({ type: AUTHORIZE_FAILED, payload: receivedData})
            yield put({ type: STOP_LOADING })
        }
    } catch (error) {
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: AUTHORIZE_FAILED, error })
        yield put({ type: STOP_LOADING })
    }
}

function* getToken(action) {
    try {
        yield put({ type: START_LOADING })
        const receivedData = yield Api.getToken(action.payload)
        console.log("__haha__",receivedData);
        if (receivedData !== null) {
            yield setObjectToken(receivedData.Items[0])
            yield put({ type: GET_TOKEN_SUCCEEDED, payload: receivedData })
            yield put({ type: STOP_LOADING })
        } else {
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
            yield put({ type: GET_TOKEN_FAILED, payload: {}})
            yield put({ type: STOP_LOADING })
        }
    } catch (error) {
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: GET_TOKEN_FAILED, error })
        yield put({ type: STOP_LOADING })
    }
}

function* verify(action) {
    try {
        yield put({ type: START_LOADING })
        const receivedDataTemp = yield Api.verify(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        if (receivedData && receivedData.ReturnValue) {
            yield put({ type: VERIFY_SUCCEEDED, payload: receivedData })
            yield put({ type: STOP_LOADING })
            yield put(navigateToStatusInfoScreenAction())
        } else {
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: receivedData.ReturnMsg }))
            yield put({ type: VERIFY_FAILED, payload: receivedData})
            yield put({ type: STOP_LOADING })
            yield put(getTokenRequestAction())
        }
    } catch (error) {
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: VERIFY_FAILED, error })
        yield put({ type: STOP_LOADING })
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

