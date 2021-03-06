import { connect } from 'react-redux'
import SidebarComponent from '../../components/Navigation/SidebarComponent';
import { 
    closeNavigationDrawerAction,
    navigateToLoginScreenAction, 
    navigateToStatusInfoScreenAction,
    navigateToAlarmLogScreenAction,
    navigateToSupportCenterScreenAction,
    replaceToLoginScreenAction,
    replaceToStatusInfoScreenAction
 } from '../../actions/NavigationActions/actionCreators';
import { disposeRequestAction } from '../../actions/AuthActions/actionCreators';
import { serverCountingRequestAction, asRequestListRequestAction } from '../../actions/OthersActions/actionCreators';

const mapStateToProps = state => ({
    verifyData: state.verifyReducer.receivedData,
    authorData: state.login.receivedData,
})

const mapDispatchToProps = dispatch => ({
    closeNavigationDrawer: (params) => dispatch(closeNavigationDrawerAction(params)),
    navigateToLoginScreen: (params) => dispatch(navigateToLoginScreenAction(params)),
    replaceToLoginScreen: (params) => dispatch(replaceToLoginScreenAction(params)),
    navigateToStatusInfoScreen: (params) => dispatch(navigateToStatusInfoScreenAction(params)),
    navigateToAlarmLogScreen: (params) => dispatch(navigateToAlarmLogScreenAction(params)),
    navigateToSupportCenterScreen: (params) => dispatch(navigateToSupportCenterScreenAction(params)),
    disposeRequest: (params) => dispatch(disposeRequestAction(params)),
    serverCountingRequest: (params) => dispatch(serverCountingRequestAction(params)),
    asRequestListRequest: (params) => dispatch(asRequestListRequestAction(params)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent)