import { connect } from 'react-redux'
import ServerDetailComponent from '../../components/StatusInfo/ServerDetailComponent'
import { submit } from 'redux-form'
import { fetchLoginAction } from '../../actions/AuthActions/actionCreators';
import { changeTabIndexServerDetailAction, serverDetailRequestAction, failureAlarmLogDetailRequestAction } from '../../actions/OthersActions/actionCreators';
import { navigateToAlarmLogDetailScreenAction } from '../../actions/NavigationActions/actionCreators';

const mapStateToProps = state => ({
    navData: state.navigationReducer.serverDetail,
    tab: state.otherReducer.tabIndexServerDetail,
    serverDetailData: state.otherReducer.serverDetailData,
    alarmItemListData: state.otherReducer.alarmItemListData,
})

const mapDispatchToProps = dispatch => ({
    fetchLoginAction: (params) => dispatch(fetchLoginAction(params)),
    changeTabIndexServerDetail: (params) => dispatch(changeTabIndexServerDetailAction(params)),
    serverDetailRequest: (index) => dispatch(serverDetailRequestAction(index)),

    navigateToAlarmLogDetailScreen: (params) => dispatch(navigateToAlarmLogDetailScreenAction(params)),
    failureAlarmLogDetailRequest: (params) => dispatch(failureAlarmLogDetailRequestAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ServerDetailComponent)