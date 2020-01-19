import RootStack from "../../RootStack";
import { Login } from "../../utilities/ScreenName";
import {
  NavigationActions,
  StackActions
} from "react-navigation";
import { DrawerActions } from 'react-navigation-drawer'; 

import {
  GO_BACK,
  NAVIGATE_TO_LOGIN_SCREEN,
  REPLACE_TO_LOGIN_SCREEN,
  NAVIGATE_TO_STATUS_INFO_SCREEN,
  NAVIGATE_TO_SERVER_DETAIL_SCREEN,
  OPEN_NAVIGATION_DRAWER,
  CLOSE_NAVIGATION_DRAWER,
  NAVIGATE_TO_ALARM_LOG_SCREEN,
  NAVIGATE_TO_ALARM_LOG_DETAIL_SCREEN,
  NAVIGATE_TO_SUPPORT_CENTER_SCREEN,
  NAVIGATE_TO_SUPPORT_VIEW_SCREEN,
  NAVIGATE_TO_SUPPORT_WRITE_SCREEN,
  REPLACE_TO_STATUS_INFO_SCREEN,
} from "../../actions/NavigationActions/actionTypes";
//Login is temp navigation
const thirdAction = RootStack.router.getActionForPathAndParams(Login);
const tempNavState = RootStack.router.getStateForAction(thirdAction);

const initialNavState = RootStack.router.getStateForAction(tempNavState);

function navigationReducer(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case GO_BACK:
      nextState = RootStack.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;

    case OPEN_NAVIGATION_DRAWER:
      nextState = RootStack.router.getStateForAction(
        DrawerActions.openDrawer(),
        { ...state, data: action.payload }
      );
      break;

    case CLOSE_NAVIGATION_DRAWER:
      nextState = RootStack.router.getStateForAction(
        DrawerActions.closeDrawer(),
        { ...state, data: action.payload }
      );
      break;

    case NAVIGATE_TO_LOGIN_SCREEN:
      nextState = RootStack.router.getStateForAction(
        StackActions.replace({ routeName: "Login" }),
        { ...state, data: action.payload }
      );
      break;

    case REPLACE_TO_LOGIN_SCREEN:
      nextState = RootStack.router.getStateForAction(
        NavigationActions.navigate({ routeName: "Login" }),
        { ...state, data: action.payload }
      );
      break;
    
    case NAVIGATE_TO_STATUS_INFO_SCREEN:
      nextState = RootStack.router.getStateForAction(
        NavigationActions.navigate({ routeName: "StatusInfo" }),
        { ...state, data: action.payload }
      );
      break;
    
    case REPLACE_TO_STATUS_INFO_SCREEN:
      nextState = RootStack.router.getStateForAction(
        StackActions.replace({ routeName: "StatusInfo" }),
        { ...state, data: action.payload }
      );
      break;
    
    case NAVIGATE_TO_SERVER_DETAIL_SCREEN:
      nextState = RootStack.router.getStateForAction(
        NavigationActions.navigate({ routeName: "ServerDetail" }),
        { ...state, serverDetail: action.payload }
      );
      break;
    
    case NAVIGATE_TO_ALARM_LOG_SCREEN:
      nextState = RootStack.router.getStateForAction(
        NavigationActions.navigate({ routeName: "AlarmLog" }),
        { ...state, data: action.payload }
      );
      break;
    
    case NAVIGATE_TO_ALARM_LOG_DETAIL_SCREEN:
      nextState = RootStack.router.getStateForAction(
        NavigationActions.navigate({ routeName: "AlarmLogDetail" }),
        { ...state, data: action.payload }
      );
      break;
    
    case NAVIGATE_TO_SUPPORT_CENTER_SCREEN:
      nextState = RootStack.router.getStateForAction(
        NavigationActions.navigate({ routeName: "SupportCenter" }),
        { ...state, data: action.payload }
      );
      break;
    
    case NAVIGATE_TO_SUPPORT_VIEW_SCREEN:
      nextState = RootStack.router.getStateForAction(
        NavigationActions.navigate({ routeName: "SupportView" }),
        { ...state, data: action.payload }
      );
      break;
    
    case NAVIGATE_TO_SUPPORT_WRITE_SCREEN:
      nextState = RootStack.router.getStateForAction(
        NavigationActions.navigate({ routeName: "SupportWrite" }),
        { ...state, data: action.payload }
      );
      break;

    default:
      nextState = RootStack.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default navigationReducer;
