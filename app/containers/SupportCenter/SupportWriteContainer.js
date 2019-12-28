import { connect } from 'react-redux'
import { navigateToSupportCenterScreenAction } from '../../actions/NavigationActions/actionCreators';
import SupportWriteComponent from '../../components/SupportCenter/SupportWriteComponent';
import { asRequestTypeListRequestAction, guestNoListRequestAction, asRequestRegistrationRequestAction, asRequestListRequestAction } from '../../actions/OthersActions/actionCreators';
import { showErrorAlertAction } from '../../actions/AppActions/actionCreators';

const mapStateToProps = state => ({
    asRequestTypeListData: state.otherReducer.asRequestTypeListData,
    guestNoListData: state.otherReducer.guestNoListData,
    asRequestRegistrationData: state.otherReducer.asRequestRegistrationData,
    asRequestRegistrationInit: state.otherReducer.asRequestRegistrationInit,
})

const mapDispatchToProps = dispatch => ({
    navigateToSupportCenterScreen: (params) => dispatch(navigateToSupportCenterScreenAction(params)),
    asRequestTypeListRequest: (params) => dispatch(asRequestTypeListRequestAction(params)),
    guestNoListRequest: (params) => dispatch(guestNoListRequestAction(params)),
    asRequestRegistrationRequest: (params) => dispatch(asRequestRegistrationRequestAction(params)),
    asRequestListRequest: (params) => dispatch(asRequestListRequestAction(params)),
    showErrorAlert: (params) => dispatch(showErrorAlertAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportWriteComponent)