import { connect } from 'react-redux'
import { navigateToSupportCenterScreenAction } from '../../actions/NavigationActions/actionCreators';
import SupportWriteComponent from '../../components/SupportCenter/SupportWriteComponent';
import { asRequestTypeListRequestAction, guestNoListRequestAction, asRequestRegistrationRequestAction } from '../../actions/OthersActions/actionCreators';

const mapStateToProps = state => ({
    asRequestTypeListData: state.otherReducer.asRequestTypeListData,
    guestNoListData: state.otherReducer.guestNoListData,
})

const mapDispatchToProps = dispatch => ({
    navigateToSupportCenterScreen: (params) => dispatch(navigateToSupportCenterScreenAction(params)),
    asRequestTypeListRequest: (params) => dispatch(asRequestTypeListRequestAction(params)),
    guestNoListRequest: (params) => dispatch(guestNoListRequestAction(params)),
    asRequestRegistrationRequest: (params) => dispatch(asRequestRegistrationRequestAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportWriteComponent)