import { connect } from 'react-redux'
import AlarmLogDetailComponent from '../../components/AlarmLog/AlarmLogDetailComponent'
import { navigateToAlarmLogScreenAction } from '../../actions/NavigationActions/actionCreators';

const mapStateToProps = state => ({
    failureAlarmLogDetailData: state.otherReducer.failureAlarmLogDetailData,
})

const mapDispatchToProps = dispatch => ({
    navigateToAlarmLogScreen: (params) => dispatch(navigateToAlarmLogScreenAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AlarmLogDetailComponent)