import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';
import noop from './helpers/noop';
import { connect } from 'react-redux'
import getCurrentRouteName from './helpers/getCurrentRoute';
import {goBackAction, navigateToAlarmLogScreenAction, navigateToSupportCenterScreenAction, navigateToStatusInfoScreenAction } from '../actions/NavigationActions/actionCreators';

class ExitOnDoubleBack extends Component {
  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
  }
  timer = {
    ref: null,
    isTimerRunning: false
  }
  _handleExit = () => {
    if (!this.timer.isTimerRunning) {
      this.timer.isTimerRunning = true;
      const backInterval = this.props.doubleBackInterval;
      clearTimeout(this.timer.ref);
      this.timer.ref = setTimeout(() => this.timer.isTimerRunning = false, backInterval);
      ToastAndroid.show(this.props.toastMessage, ToastAndroid.SHORT);
      return true; // don't do anything
    }
    return this.props.onDoubleBack && this.props.onDoubleBack();
  }

  _handleBackPress = () => {
    const {currentNavi, goBack, navigateToAlarmLogScreen, navigateToSupportCenterScreen, navigateToStatusInfoScreen} = this.props;
    console.log("__currentNaviKey__", currentNaviKey)
    let currentNaviKey = getCurrentRouteName(currentNavi);
    if (currentNaviKey && this.props.exitableRoutes.includes(currentNaviKey)) { // exit the app from landing page
      return this._handleExit();
    } else { // in all the other cases, navigate back
      switch(currentNaviKey){
        case "AlarmLogDetail": navigateToAlarmLogScreen(); break;
        case "SupportView": navigateToSupportCenterScreen(); break;
        case "SupportWrite": navigateToSupportCenterScreen(); break;
        case "AlarmLog": navigateToStatusInfoScreen(); break;
        case "SupportCenter": navigateToStatusInfoScreen(); break;
        default: goBack();
      }
      return true
    }
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
    clearTimeout(this.timer.ref);
    this.timer = {
      ref: null,
      isTimerRunning: false
    };
  }

  render () {
    return this.props.children;
  }
}
ExitOnDoubleBack.defaultProps = {
  toastMessage: 'Press back again to exit the app',
  doubleBackInterval: 3000,
  exitableRoutes: ['Landing'],
  onDoubleBack: BackHandler.exitApp,
  backHandler: noop,
  nav: {}
};
ExitOnDoubleBack.propTypes = {
  toastMessage: PropTypes.string,
  doubleBackInterval: PropTypes.number,
  exitableRoutes: PropTypes.array,
  children: PropTypes.node,
  onDoubleBack: PropTypes.func,
  backHandler: PropTypes.func,
  nav: PropTypes.object,
};

const mapStateToProps = state => ({
  currentNavi: state.navigationReducer
})

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(goBackAction()),
  navigateToAlarmLogScreen: (params) => dispatch(navigateToAlarmLogScreenAction(params)),
  navigateToSupportCenterScreen: (params) => dispatch(navigateToSupportCenterScreenAction(params)),
  navigateToStatusInfoScreen: (params) => dispatch(navigateToStatusInfoScreenAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExitOnDoubleBack)