import {
  AUTHORIZE_REQUEST,
  AUTHORIZE_SUCCEEDED,
  AUTHORIZE_FAILED,

  SET_AUTO_LOGIN_TRUE,
  SET_AUTO_LOGIN_FALSE,

  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCEEDED,
  GET_TOKEN_FAILED,

  VERIFY_REQUEST,
  VERIFY_SUCCEEDED,
  VERIFY_FAILED,
} from "./actionTypes";

const authorizeRequestAction = params => ({
  type: AUTHORIZE_REQUEST,
  payload: params
});

const authorizeSucceededAction = receivedData => ({
  type: AUTHORIZE_SUCCEEDED,
  payload: receivedData
});

const authorizeFailedAction = error => ({
  type: AUTHORIZE_FAILED,
  payload: error
});

const setAutoLoginTrueAction = () => ({
  type: SET_AUTO_LOGIN_TRUE
});

const setAutoLoginFalseAction = () => ({
  type: SET_AUTO_LOGIN_FALSE
});

const getTokenRequestAction = params => ({
  type: GET_TOKEN_REQUEST,
  payload: params
});

const getTokenSucceededAction = receivedData => ({
  type: GET_TOKEN_SUCCEEDED,
  payload: receivedData
});

const getTokenFailedAction = error => ({
  type: GET_TOKEN_FAILED,
  payload: error
});

const verifyRequestAction = params => ({
  type: VERIFY_REQUEST,
  payload: params
});

const verifySucceededAction = receivedData => ({
  type: VERIFY_SUCCEEDED,
  payload: receivedData
});

const verifyFailedAction = error => ({
  type: VERIFY_FAILED,
  payload: error
});

export {
  authorizeRequestAction,
  authorizeSucceededAction,
  authorizeFailedAction,
  
  setAutoLoginTrueAction,
  setAutoLoginFalseAction,
  
  getTokenRequestAction,
  getTokenSucceededAction,
  getTokenFailedAction,
  
  verifyRequestAction,
  verifySucceededAction,
  verifyFailedAction,
};
