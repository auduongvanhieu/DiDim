import {
  GO_BACK,
  OPEN_NAVIGATION_DRAWER,
  CLOSE_NAVIGATION_DRAWER,
  NAVIGATE_TO_LOGIN_SCREEN,
  REPLACE_TO_LOGIN_SCREEN,
  NAVIGATE_TO_STATUS_INFO_SCREEN,
  REPLACE_TO_STATUS_INFO_SCREEN,
  NAVIGATE_TO_SERVER_DETAIL_SCREEN,
  NAVIGATE_TO_ALARM_LOG_SCREEN,
  NAVIGATE_TO_ALARM_LOG_DETAIL_SCREEN,
  NAVIGATE_TO_SUPPORT_CENTER_SCREEN,
  NAVIGATE_TO_SUPPORT_VIEW_SCREEN,
  NAVIGATE_TO_SUPPORT_WRITE_SCREEN,
} from "./actionTypes";

const goBackAction = params => ({
  type: GO_BACK,
  payload: params
});

const openNavigationDrawerAction = params => ({
  type: OPEN_NAVIGATION_DRAWER,
  payload: params
});

const closeNavigationDrawerAction = params => ({
  type: CLOSE_NAVIGATION_DRAWER,
  payload: params
});

const navigateToLoginScreenAction = params => ({
  type: NAVIGATE_TO_LOGIN_SCREEN,
  payload: params
});

const replaceToLoginScreenAction = params => ({
  type: REPLACE_TO_LOGIN_SCREEN,
  payload: params
});

const navigateToStatusInfoScreenAction = params => ({
  type: NAVIGATE_TO_STATUS_INFO_SCREEN,
  payload: params
});

const replaceToStatusInfoScreenAction = params => ({
  type: REPLACE_TO_STATUS_INFO_SCREEN,
  payload: params
});

const navigateToServerDetailScreenAction = params => ({
  type: NAVIGATE_TO_SERVER_DETAIL_SCREEN,
  payload: params
});

const navigateToAlarmLogScreenAction = params => ({
  type: NAVIGATE_TO_ALARM_LOG_SCREEN,
  payload: params
});

const navigateToAlarmLogDetailScreenAction = params => ({
  type: NAVIGATE_TO_ALARM_LOG_DETAIL_SCREEN,
  payload: params
});

const navigateToSupportCenterScreenAction = params => ({
  type: NAVIGATE_TO_SUPPORT_CENTER_SCREEN,
  payload: params
});

const navigateToSupportViewScreenAction = params => ({
  type: NAVIGATE_TO_SUPPORT_VIEW_SCREEN,
  payload: params
});

const navigateToSupportWriteScreenAction = params => ({
  type: NAVIGATE_TO_SUPPORT_WRITE_SCREEN,
  payload: params
});

export {
  goBackAction,
  openNavigationDrawerAction,
  closeNavigationDrawerAction,
  navigateToLoginScreenAction,
  replaceToLoginScreenAction,
  navigateToStatusInfoScreenAction,
  replaceToStatusInfoScreenAction,
  navigateToServerDetailScreenAction,
  navigateToAlarmLogScreenAction,
  navigateToAlarmLogDetailScreenAction,
  navigateToSupportCenterScreenAction,
  navigateToSupportViewScreenAction,
  navigateToSupportWriteScreenAction,
};
