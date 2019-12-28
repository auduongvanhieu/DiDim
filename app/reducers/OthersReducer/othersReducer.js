
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

    AS_REQUEST_DETAIL_SUCCEEDED,
    AS_REQUEST_DETAIL_FAILED,

    COMMENT_REGISTRATION_SUCCEEDED,
    COMMENT_REGISTRATION_FAILED,

    AS_REQUEST_TYPE_LIST_SUCCEEDED,
    AS_REQUEST_TYPE_LIST_FAILED,

    GUEST_NO_LIST_SUCCEEDED,
    GUEST_NO_LIST_FAILED,

    AS_REQUEST_REGISTRATION_SUCCEEDED,
    AS_REQUEST_REGISTRATION_FAILED,

    AS_REQUEST_REGISTRATION_INIT
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

        case AS_REQUEST_DETAIL_SUCCEEDED:
            return { ...state, asRequestDetailData: actions.payload };
        case AS_REQUEST_DETAIL_FAILED:
            return { ...state, asRequestDetailData: actions.payload };

        case COMMENT_REGISTRATION_SUCCEEDED:
            return { ...state, commentRegistrationData: actions.payload };
        case COMMENT_REGISTRATION_FAILED:
            return { ...state, commentRegistrationData: actions.payload };

        case AS_REQUEST_TYPE_LIST_SUCCEEDED:
            return { ...state, asRequestTypeListData: actions.payload };
        case AS_REQUEST_TYPE_LIST_FAILED:
            return { ...state, asRequestTypeListData: actions.payload };

        case GUEST_NO_LIST_SUCCEEDED:
            return { ...state, guestNoListData: actions.payload };
        case GUEST_NO_LIST_FAILED:
            return { ...state, guestNoListData: actions.payload };

        case AS_REQUEST_REGISTRATION_SUCCEEDED:
            return { ...state, asRequestRegistrationData: actions.payload };
        case AS_REQUEST_REGISTRATION_FAILED:
            return { ...state, asRequestRegistrationData: actions.payload };
            
        case AS_REQUEST_REGISTRATION_INIT:
            return { ...state, asRequestRegistrationInit: actions.payload };

        default:
            return state;
    }
}

export {
    otherReducer
}


