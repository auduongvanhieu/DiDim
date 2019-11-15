import {
    CHANGE_TAB_INDEX_SERVER_DETAIL,

    SERVER_LIST_REQUEST,
    SERVER_LIST_SUCCEEDED,
    SERVER_LIST_FAILED,

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

} from "./actionTypes";

const changeTabIndexServerDetailAction = (index) => ({
    type: CHANGE_TAB_INDEX_SERVER_DETAIL,
    payload: index
});


const serverListRequestAction = params => ({
    type: SERVER_LIST_REQUEST,
    payload: params
  });
  
const serverDetailSucceededAction = receivedData => ({
    type: SERVER_LIST_SUCCEEDED,
    payload: receivedData
  });
  
const serverDetailFailedAction = error => ({
    type: SERVER_LIST_FAILED,
    payload: error
  });


const serverDetailRequestAction = params => ({
    type: SERVER_DETAIL_REQUEST,
    payload: params
  });
  
const serverListSucceededAction = receivedData => ({
    type: SERVER_DETAIL_SUCCEEDED,
    payload: receivedData
  });
  
const serverListFailedAction = error => ({
    type: SERVER_DETAIL_FAILED,
    payload: error
  });


const serverCountingRequestAction = params => ({
    type: SERVER_COUNTING_REQUEST,
    payload: params
  });
  
const serverCountingSucceededAction = receivedData => ({
    type: SERVER_COUNTING_SUCCEEDED,
    payload: receivedData
  });
  
const serverCountingFailedAction = error => ({
    type: SERVER_COUNTING_FAILED,
    payload: error
  });


const alarmItemListRequestAction = params => ({
    type: ALARM_ITEM_LIST_REQUEST,
    payload: params
  });
  
const alarmItemListSucceededAction = receivedData => ({
    type: ALARM_ITEM_LIST_SUCCEEDED,
    payload: receivedData
  });
  
const alarmItemListFailedAction = error => ({
    type: ALARM_ITEM_LIST_FAILED,
    payload: error
  });


const failureAlarmLogRequestAction = params => ({
    type: FAILURE_ALARM_LOG_REQUEST,
    payload: params
  });
  
const failureAlarmLogSucceededAction = receivedData => ({
    type: FAILURE_ALARM_LOG_SUCCEEDED,
    payload: receivedData
  });
  
const failureAlarmLogFailedAction = error => ({
    type: FAILURE_ALARM_LOG_FAILED,
    payload: error
  });


const failureAlarmLogDetailRequestAction = params => ({
    type: FAILURE_ALARM_LOG_DETAIL_REQUEST,
    payload: params
  });
  
const failureAlarmLogDetailSucceededAction = receivedData => ({
    type: FAILURE_ALARM_LOG_DETAIL_SUCCEEDED,
    payload: receivedData
  });
  
const failureAlarmLogDetailFailedAction = error => ({
    type: FAILURE_ALARM_LOG_DETAIL_FAILED,
    payload: error
  });


const asRequestListRequestAction = params => ({
    type: AS_REQUEST_LIST_REQUEST,
    payload: params
  });
  
const asRequestListSucceededAction = receivedData => ({
    type: AS_REQUEST_LIST_SUCCEEDED,
    payload: receivedData
  });
  
const asRequestListFailedAction = error => ({
    type: AS_REQUEST_LIST_FAILED,
    payload: error
  });


const asRequestDetailRequestAction = params => ({
    type: AS_REQUEST_DETAIL_REQUEST,
    payload: params
  });
  
const asRequestDetailSucceededAction = receivedData => ({
    type: AS_REQUEST_DETAIL_SUCCEEDED,
    payload: receivedData
  });
  
const asRequestDetailFailedAction = error => ({
    type: AS_REQUEST_DETAIL_FAILED,
    payload: error
  });


const commentRegistrationRequestAction = params => ({
    type: COMMENT_REGISTRATION_REQUEST,
    payload: params
  });
  
const commentRegistrationSucceededAction = receivedData => ({
    type: COMMENT_REGISTRATION_SUCCEEDED,
    payload: receivedData
  });
  
const commentRegistrationFailedAction = error => ({
    type: COMMENT_REGISTRATION_FAILED,
    payload: error
  });

export {
    changeTabIndexServerDetailAction,

    serverListRequestAction,
    serverListSucceededAction,
    serverListFailedAction,

    serverDetailRequestAction,
    serverDetailSucceededAction,
    serverDetailFailedAction,

    serverCountingRequestAction,
    serverCountingSucceededAction,
    serverCountingFailedAction,

    alarmItemListRequestAction,
    alarmItemListSucceededAction,
    alarmItemListFailedAction,

    failureAlarmLogRequestAction,
    failureAlarmLogSucceededAction,
    failureAlarmLogFailedAction,

    failureAlarmLogDetailRequestAction,
    failureAlarmLogDetailSucceededAction,
    failureAlarmLogDetailFailedAction,

    asRequestListRequestAction,
    asRequestListSucceededAction,
    asRequestListFailedAction,

    asRequestDetailRequestAction,
    asRequestDetailSucceededAction,
    asRequestDetailFailedAction,

    commentRegistrationRequestAction,
    commentRegistrationSucceededAction,
    commentRegistrationFailedAction,
};
