import { combineReducers } from "redux";
//Redux persist
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer as formReducer } from "redux-form";

const projectConfig = {
  key: "project",
  storage
};

import {
  authorizeReducer,
  autoLoginReducer,
  getTokenReducer,
  verifyReducer,
} from "./AuthReducer/authReducer";

import {otherReducer} from "./OthersReducer/othersReducer";

const projectReducer = persistReducer(projectConfig, authorizeReducer);

import navigationReducer from "./NavigationReducer/navigationReducer";
import appReducer from "./AppReducer/appReducer";

const allReducers = combineReducers({
  projectReducer,
  navigationReducer,
  form: formReducer,
  app: appReducer,
  login: authorizeReducer,
  autoLoginReducer,
  getTokenReducer,
  verifyReducer,
  otherReducer
});

export default allReducers;
