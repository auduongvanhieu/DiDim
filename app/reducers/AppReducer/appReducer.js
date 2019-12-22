import {
  START_LOADING,
  STOP_LOADING,
  SHOW_SUCCESS_ALERT,
  SHOW_ERROR_ALERT,
  SHOW_INFO_DIALOG,
  HIDE_INFO_DIALOG
} from "../../actions/AppActions/actionTypes";
import { Alert } from "react-native";
import I18n from "../../I18n";

const appReducer = (state = [], actions) => {
  switch (actions.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };

    case SHOW_SUCCESS_ALERT:
      return {
        ...state,
        alert: {
          type: "success",
          title: actions.payload.title,
          description: actions.payload.description
        }
      };
    case SHOW_ERROR_ALERT:
      Alert.alert(
        actions.payload.title,
        actions.payload.description,
        [
          {text: I18n.t('confirm'), onPress: () => {}},
        ],
        {cancelable: true},
      );
      return {
        ...state,
        alert: {
          type: "error",
          title: actions.payload.title,
          description: actions.payload.description
        }
      };

    case SHOW_INFO_DIALOG:
      return { ...state, infoDialog: actions.payload, dialogInfoVisible: true };
    case HIDE_INFO_DIALOG:
      return { ...state, infoDialog: undefined, dialogInfoVisible: false };
    default:
      return state;
  }
};

export default appReducer;
