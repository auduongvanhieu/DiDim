
import {
    CHANGE_TAB_INDEX_SERVER_DETAIL,

    SERVER_LIST_SUCCEEDED,
    SERVER_LIST_FAILED,

    SERVER_DETAIL_SUCCEEDED,
    SERVER_DETAIL_FAILED,

    SERVER_COUNTING_SUCCEEDED,
    SERVER_COUNTING_FAILED,

    ALARM_ITEM_LIST_SUCCEEDED,
    ALARM_ITEM_LIST_FAILED,

    FAILURE_ALARM_LOG_SUCCEEDED,
    FAILURE_ALARM_LOG_FAILED,

    FAILURE_ALARM_LOG_DETAIL_SUCCEEDED,
    FAILURE_ALARM_LOG_DETAIL_FAILED,

    AS_REQUEST_LIST_SUCCEEDED,
    AS_REQUEST_LIST_FAILED,

} from '../../actions/OthersActions/actionTypes';

const otherReducer = (state = {tabIndexServerDetail: 0}, actions) => {
    switch (actions.type) {
        case CHANGE_TAB_INDEX_SERVER_DETAIL:
            return { ...state, tabIndexServerDetail: actions.payload };

        case SERVER_LIST_SUCCEEDED:
            return { ...state, serverListData: actions.payload };
        case SERVER_LIST_FAILED:
            return { ...state, serverListData: actions.payload };

        case SERVER_DETAIL_SUCCEEDED:
            return { ...state, serverDetailData: actions.payload };
        case SERVER_DETAIL_FAILED:
            return { ...state, serverDetailData: actions.payload };

        case SERVER_COUNTING_SUCCEEDED:
            return { ...state, serverCountingData: actions.payload };
        case SERVER_COUNTING_FAILED:
            return { ...state, serverCountingData: actions.payload };

        case ALARM_ITEM_LIST_SUCCEEDED:
            return { ...state, alarmItemListData: actions.payload };
        case ALARM_ITEM_LIST_FAILED:
            return { ...state, alarmItemListData: actions.payload };

        case FAILURE_ALARM_LOG_SUCCEEDED:
            return { ...state, failureAlarmLogData: actions.payload };
        case FAILURE_ALARM_LOG_FAILED:
            return { ...state, failureAlarmLogData: actions.payload };

        case FAILURE_ALARM_LOG_DETAIL_SUCCEEDED:
            return { ...state, failureAlarmLogDetailData: actions.payload };
        case FAILURE_ALARM_LOG_DETAIL_FAILED:
            return { ...state, failureAlarmLogDetailData: actions.payload };

        case AS_REQUEST_LIST_SUCCEEDED:
            return { ...state, asRequestListData: actions.payload };
        case AS_REQUEST_LIST_FAILED:
            return { ...state, asRequestListData: actions.payload };
            
        default:
            return state;
    }
}

export {
    otherReducer
}


