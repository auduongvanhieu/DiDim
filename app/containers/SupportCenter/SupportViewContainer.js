import { connect } from 'react-redux'
import SupportViewComponent from '../../components/SupportCenter/SupportViewComponent'
import { navigateToSupportCenterScreenAction } from '../../actions/NavigationActions/actionCreators';
import {
  asRequestListRequestAction,
  commentRegistrationRequestAction,
  asRequestDetailRequestAction
} from "../../actions/OthersActions/actionCreators";

const mapStateToProps = state => ({
    navData: state.navigationReducer.data,
    asRequestDetailData: state.otherReducer.asRequestDetailData,
    commentRegistrationData: state.otherReducer.commentRegistrationData,
})

const mapDispatchToProps = dispatch => ({
    navigateToSupportCenterScreen: (params) => dispatch(navigateToSupportCenterScreenAction(params)),
    asRequestListRequest: (params) => dispatch(asRequestListRequestAction(params)),
    commentRegistrationRequest: (params) => dispatch(commentRegistrationRequestAction(params)),
    asRequestDetailRequest: (params) => dispatch(asRequestDetailRequestAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportViewComponent)