
import {
    AUTHORIZE_SUCCEEDED,
    AUTHORIZE_FAILED,

    SET_AUTO_LOGIN_TRUE,
    SET_AUTO_LOGIN_FALSE,

    GET_TOKEN_SUCCEEDED, 
    GET_TOKEN_FAILED,

    VERIFY_SUCCEEDED,
    VERIFY_FAILED,
} from '../../actions/AuthActions/actionTypes'


const authorizeReducer = (state = {}, actions) => {
    switch (actions.type) {
        case AUTHORIZE_SUCCEEDED:
            return { ...state, receivedData: actions.payload };
        case AUTHORIZE_FAILED:
            return { ...state, receivedData: actions.payload };
        default:
            return state;
    }
}

const autoLoginReducer = (state = { isAutoLogin: false }, actions) => {
    switch (actions.type) {
        case SET_AUTO_LOGIN_TRUE:
            return { ...state, isAutoLogin: true };
        case SET_AUTO_LOGIN_FALSE:
            return { ...state, isAutoLogin: false };
        default:
            return state;
    }
};

const getTokenReducer = (state = {}, actions) => {
    switch (actions.type) {
        case GET_TOKEN_SUCCEEDED:
            return { ...state, receivedData: actions.payload };
        case GET_TOKEN_FAILED:
            return { ...state, receivedData: actions.payload };
        default:
            return state;
    }
};

const verifyReducer = (state = {}, actions) => {
    switch (actions.type) {
        case VERIFY_SUCCEEDED:
            return { ...state, receivedData: actions.payload };
        case VERIFY_FAILED:
            return { ...state, receivedData: actions.payload };
        default:
            return state;
    }
};


export {
    authorizeReducer,
    autoLoginReducer,
    getTokenReducer,
    verifyReducer
}

