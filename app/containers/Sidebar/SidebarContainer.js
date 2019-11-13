import { connect } from 'react-redux'
import SidebarComponent from '../../components/Navigation/SidebarComponent';
import { 
    closeNavigationDrawerAction,
    navigateToLoginScreenAction, 
    navigateToStatusInfoScreenAction,
    navigateToAlarmLogScreenAction,
    navigateToSupportCenterScreenAction
 } from '../../actions/NavigationActions/actionCreators';

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    closeNavigationDrawer: (params) => dispatch(closeNavigationDrawerAction(params)),
    navigateToLoginScreen: (params) => dispatch(navigateToLoginScreenAction(params)),
    navigateToStatusInfoScreen: (params) => dispatch(navigateToStatusInfoScreenAction(params)),
    navigateToAlarmLogScreen: (params) => dispatch(navigateToAlarmLogScreenAction(params)),
    navigateToSupportCenterScreen: (params) => dispatch(navigateToSupportCenterScreenAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent)