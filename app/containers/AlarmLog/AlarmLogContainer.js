import { connect } from 'react-redux'
import AlarmLogComponent from '../../components/AlarmLog/AlarmLogComponent'
import { navigateToAlarmLogDetailScreenAction } from '../../actions/NavigationActions/actionCreators';
import { 
    failureAlarmLogRequestAction
} from '../../actions/OthersActions/actionCreators';
import { startLoadingAction } from '../../actions/AppActions/actionCreators';

const mapStateToProps = state => ({
    failureAlarmLogData: state.otherReducer.failureAlarmLogData,
})

const mapDispatchToProps = dispatch => ({
    navigateToAlarmLogDetailScreen: (params) => dispatch(navigateToAlarmLogDetailScreenAction(params)),
    failureAlarmLogRequest: (params) => dispatch(failureAlarmLogRequestAction(params)),
    startLoading: () => dispatch(startLoadingAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AlarmLogComponent)