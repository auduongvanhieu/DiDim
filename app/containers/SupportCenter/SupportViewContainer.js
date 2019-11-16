import { connect } from 'react-redux'
import SupportViewComponent from '../../components/SupportCenter/SupportViewComponent'
import { navigateToAlarmLogDetailScreenAction, navigateToSupportCenterScreenAction } from '../../actions/NavigationActions/actionCreators';
import { asRequestListRequestAction, commentRegistrationRequestAction } from '../../actions/OthersActions/actionCreators';

const mapStateToProps = state => ({
    navData: state.navigationReducer.data,
    asRequestDetailData: state.otherReducer.asRequestDetailData,
    commentRegistrationData: state.otherReducer.commentRegistrationData,
})

const mapDispatchToProps = dispatch => ({
    navigateToSupportCenterScreen: (params) => dispatch(navigateToSupportCenterScreenAction(params)),
    asRequestListRequest: (params) => dispatch(asRequestListRequestAction(params)),
    commentRegistrationRequest: (params) => dispatch(commentRegistrationRequestAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportViewComponent)