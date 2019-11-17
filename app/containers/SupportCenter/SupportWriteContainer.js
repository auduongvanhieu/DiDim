import { connect } from 'react-redux'
import { navigateToSupportCenterScreenAction } from '../../actions/NavigationActions/actionCreators';
import SupportWriteComponent from '../../components/SupportCenter/SupportWriteComponent';
import { asRequestTypeListRequestAction } from '../../actions/OthersActions/actionCreators';

const mapStateToProps = state => ({
    asRequestTypeListData: state.otherReducer.asRequestTypeListData,
})

const mapDispatchToProps = dispatch => ({
    navigateToSupportCenterScreen: (params) => dispatch(navigateToSupportCenterScreenAction(params)),
    asRequestTypeListRequest: (params) => dispatch(asRequestTypeListRequestAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportWriteComponent)