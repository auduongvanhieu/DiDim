import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import allReducers from "./reducers/";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
// import { YellowBox } from 'react-native'
import rootSaga from "./sagas/rootSaga";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import NavigationContainer from "./containers/Navigation/NavigationContainer";
import SplashScreen from "react-native-splash-screen";
import ExitOnDoubleBack from './utilities/ExitOnDoubleBack'

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true
});

// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
// YellowBox.ignoreWarnings(['Module RCTImageLoader requires'])

const navigationMiddleware = createReactNavigationReduxMiddleware(
  state => state.navigationReducer,
  "root"
);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  allReducers,
  applyMiddleware(sagaMiddleware, navigationMiddleware, logger)
);

let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ExitOnDoubleBack 
            exitableRoutes={["Login", "StatusInfo", "AlarmLog",
              "SupportCenter",
            ]}>
            <NavigationContainer />
          </ExitOnDoubleBack>
        </PersistGate>
      </Provider>
    );
  }
}
