import {
    SERVER_LIST_REQUEST,
    SERVER_LIST_FAILED,
    SERVER_LIST_SUCCEEDED,

    SERVER_DETAIL_REQUEST,
    SERVER_DETAIL_SUCCEEDED,
    SERVER_DETAIL_FAILED,

    SERVER_COUNTING_REQUEST,
    SERVER_COUNTING_SUCCEEDED,
    SERVER_COUNTING_FAILED,

    ALARM_ITEM_LIST_REQUEST,
    ALARM_ITEM_LIST_SUCCEEDED,
    ALARM_ITEM_LIST_FAILED,

    FAILURE_ALARM_LOG_REQUEST,
    FAILURE_ALARM_LOG_SUCCEEDED,
    FAILURE_ALARM_LOG_FAILED,

    FAILURE_ALARM_LOG_DETAIL_REQUEST,
    FAILURE_ALARM_LOG_DETAIL_SUCCEEDED,
    FAILURE_ALARM_LOG_DETAIL_FAILED,

    AS_REQUEST_LIST_REQUEST,
    AS_REQUEST_LIST_SUCCEEDED,
    AS_REQUEST_LIST_FAILED,

    AS_REQUEST_DETAIL_REQUEST,
    AS_REQUEST_DETAIL_SUCCEEDED,
    AS_REQUEST_DETAIL_FAILED,

    COMMENT_REGISTRATION_REQUEST,
    COMMENT_REGISTRATION_SUCCEEDED,
    COMMENT_REGISTRATION_FAILED,

} from '../../actions/OthersActions/actionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { Api } from '../Api'
import { START_LOADING, STOP_LOADING, SHOW_ERROR_ALERT } from '../../actions/AppActions/actionTypes';
import { showErrorAlertAction } from '../../actions/AppActions/actionCreators';
import I18n from '../../I18n';
import { navigateToStatusInfoScreenAction } from '../../actions/NavigationActions/actionCreators';
import { Images } from '../../assets';

function* serverList(action) {
    try {
        // yield put({ type: START_LOADING })
        const receivedDataTemp = yield Api.mainApi(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        if (receivedData && receivedData.ReturnValue) {
            receivedData.Items.map((item)=>{
                item.icon = Images.ico_cloud
            })
            yield put({ type: SERVER_LIST_SUCCEEDED, payload: receivedData.Items })
            yield put({ type: STOP_LOADING })
        } else {
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: receivedData.ReturnMsg }))
            yield put({ type: SERVER_LIST_FAILED, payload: []})
            yield put({ type: STOP_LOADING })
        }
    } catch (error) {
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: SERVER_LIST_FAILED, payload: [] })
        yield put({ type: STOP_LOADING })
    }
}

export function* watchServerList() {
    yield takeLatest(SERVER_LIST_REQUEST, serverList)
}


function* serverDetail(action) {
    try {
        // yield put({ type: START_LOADING })
        const receivedDataTemp = yield Api.mainApi(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        if (receivedData && receivedData.ReturnValue && receivedData.Items.length>0) {
            receivedData.Items.map((item)=>{
                item.icon = Images.ico_cloud
            })
            yield put({ type: SERVER_DETAIL_SUCCEEDED, payload: receivedData.Items[0] })
            yield put({ type: STOP_LOADING })
        } else {
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: receivedData.ReturnMsg }))
            yield put({ type: SERVER_DETAIL_FAILED, payload: undefined})
            yield put({ type: STOP_LOADING })
        }
    } catch (error) {
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: SERVER_DETAIL_FAILED, payload: undefined })
        yield put({ type: STOP_LOADING })
    }
}

export function* watchServerDetail() {
    yield takeLatest(SERVER_DETAIL_REQUEST, serverDetail)
}


function* serverCounting(action) {
    try {
        yield put({ type: START_LOADING })
        const receivedDataTemp = yield Api.mainApi(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        if (receivedData && receivedData.ReturnValue && receivedData.Items.length > 0) {
            yield put({ type: SERVER_COUNTING_SUCCEEDED, payload: receivedData.Items[0] })
            yield put({ type: STOP_LOADING })
        } else {
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: receivedData.ReturnMsg }))
            yield put({ type: SERVER_COUNTING_FAILED, payload: receivedData})
            yield put({ type: STOP_LOADING })
        }
    } catch (error) {
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: SERVER_COUNTING_FAILED, error })
        yield put({ type: STOP_LOADING })
    }
}

export function* watchServerCounting() {
    yield takeLatest(SERVER_COUNTING_REQUEST, serverCounting)
}


function* alarmItemList(action) {
    try {
        yield put({ type: START_LOADING })
        const receivedDataTemp = yield Api.mainApi(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        if (receivedData && receivedData.ReturnValue) {
            yield put({ type: ALARM_ITEM_LIST_SUCCEEDED, payload: receivedData.Items })
            yield put({ type: STOP_LOADING })
        } else {
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: receivedData.ReturnMsg }))
            yield put({ type: ALARM_ITEM_LIST_FAILED, payload: receivedData})
            yield put({ type: STOP_LOADING })
        }
    } catch (error) {
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: ALARM_ITEM_LIST_FAILED, error })
        yield put({ type: STOP_LOADING })
    }
}

export function* watchAlarmItemList() {
    yield takeLatest(ALARM_ITEM_LIST_REQUEST, alarmItemList)
}


function* failureAlarmLog(action) {
    try {
        // yield put({ type: START_LOADING })
        const receivedDataTemp = yield Api.mainApi(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        if (receivedData && receivedData.ReturnValue) {
            yield put({ type: FAILURE_ALARM_LOG_SUCCEEDED, payload: receivedData.Items })
            yield put({ type: STOP_LOADING })
        } else {
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: receivedData.ReturnMsg }))
            yield put({ type: FAILURE_ALARM_LOG_FAILED, payload: []})
            yield put({ type: STOP_LOADING })
        }
    } catch (error) {
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: FAILURE_ALARM_LOG_FAILED, payload: [] })
        yield put({ type: STOP_LOADING })
    }
}

export function* watchFailureAlarmLog() {
    yield takeLatest(FAILURE_ALARM_LOG_REQUEST, failureAlarmLog)
}


function* failureAlarmLogDetail(action) {
    try {
        yield put({ type: START_LOADING })
        const receivedDataTemp = yield Api.mainApi(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        if (receivedData && receivedData.ReturnValue && receivedData.Items.length>0) {
            yield put({ type: FAILURE_ALARM_LOG_DETAIL_SUCCEEDED, payload: receivedData.Items[0] })
            yield put({ type: STOP_LOADING })
        } else {
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: receivedData.ReturnMsg }))
            yield put({ type: FAILURE_ALARM_LOG_DETAIL_FAILED, payload: undefined})
            yield put({ type: STOP_LOADING })
        }
    } catch (error) {
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: FAILURE_ALARM_LOG_DETAIL_FAILED, payload: undefined })
        yield put({ type: STOP_LOADING })
    }
}

export function* watchFailureAlarmLogDetail() {
    yield takeLatest(FAILURE_ALARM_LOG_DETAIL_REQUEST, failureAlarmLogDetail)
}


function* asRequestList(action) {
    try {
        // yield put({ type: START_LOADING })
        const receivedDataTemp = yield Api.mainApi(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        if (receivedData && receivedData.ReturnValue) {
            yield put({ type: AS_REQUEST_LIST_SUCCEEDED, payload: receivedData.Items })
            yield put({ type: STOP_LOADING })
        } else {
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: receivedData.ReturnMsg }))
            yield put({ type: AS_REQUEST_LIST_FAILED, payload: []})
            yield put({ type: STOP_LOADING })
        }
    } catch (error) {
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: AS_REQUEST_LIST_FAILED, payload: [] })
        yield put({ type: STOP_LOADING })
    }
}

export function* watchAsRequestList() {
    yield takeLatest(AS_REQUEST_LIST_REQUEST, asRequestList)
}


function* asRequestDetail(action) {
    try {
        yield put({ type: START_LOADING })
        const receivedDataTemp = yield Api.mainApi(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        if (receivedData && receivedData.ReturnValue && receivedData.Items.length>0) {
            yield put({ type: AS_REQUEST_DETAIL_SUCCEEDED, payload: receivedData.Items[0] })
            yield put({ type: STOP_LOADING })
        } else {
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: receivedData.ReturnMsg }))
            yield put({ type: AS_REQUEST_DETAIL_FAILED, payload: undefined})
            yield put({ type: STOP_LOADING })
        }
    } catch (error) {
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: AS_REQUEST_DETAIL_FAILED, payload: undefined })
        yield put({ type: STOP_LOADING })
    }
}

export function* watchAsRequestDetail() {
    yield takeLatest(AS_REQUEST_DETAIL_REQUEST, asRequestDetail)
}


function* commentRegistration(action) {
    try {
        yield put({ type: START_LOADING })
        const receivedDataTemp = yield Api.mainApi(action.payload)
        receivedData = JSON.parse(receivedDataTemp)
        if (receivedData && receivedData.ReturnValue) {
            yield put({ type: COMMENT_REGISTRATION_SUCCEEDED, payload: receivedData })
            yield put({ type: STOP_LOADING })
        } else {
            yield put(showErrorAlertAction({ title: I18n.t('failure'), description: receivedData.ReturnMsg }))
            yield put({ type: COMMENT_REGISTRATION_FAILED, payload: undefined})
            yield put({ type: STOP_LOADING })
        }
    } catch (error) {
        console.log(error);
        yield put(showErrorAlertAction({ title: I18n.t('failure'), description: I18n.t('connectionErrors') }))
        yield put({ type: COMMENT_REGISTRATION_FAILED, payload: undefined })
        yield put({ type: STOP_LOADING })
    }
}

export function* watchCommentRegistration() {
    yield takeLatest(COMMENT_REGISTRATION_REQUEST, commentRegistration)
}