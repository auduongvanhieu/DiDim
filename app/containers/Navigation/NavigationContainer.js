import { connect } from 'react-redux'
import NavigationComponent from '../../components/Navigation/NavigationComponent';
import { navigateToAlarmLogDetailScreenAction, navigateToSupportViewScreenAction } from '../../actions/NavigationActions/actionCreators';
import { failureAlarmLogDetailRequestAction, asRequestDetailRequestAction } from '../../actions/OthersActions/actionCreators';

const mapStateToProps = state => ({
    alert: state.app.alert,
    isLoading: state.app.isLoading,
    serverListData: state.otherReducer.serverListData,
})

const mapDispatchToProps = dispatch => ({
    navigateToAlarmLogDetailScreen: (params) => dispatch(navigateToAlarmLogDetailScreenAction(params)),
    failureAlarmLogDetailRequest: (params) => dispatch(failureAlarmLogDetailRequestAction(params)),
    navigateToSupportViewScreen: (params) => dispatch(navigateToSupportViewScreenAction(params)),
    asRequestDetailRequest: (params) => dispatch(asRequestDetailRequestAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationComponent)