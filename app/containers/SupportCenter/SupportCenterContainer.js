import { connect } from 'react-redux'
import SupportCenterComponent from '../../components/SupportCenter/SupportCenterComponent'
import { navigateToSupportViewScreenAction, navigateToSupportWriteScreenAction } from '../../actions/NavigationActions/actionCreators';
import { asRequestListRequestAction } from '../../actions/OthersActions/actionCreators';
import { startLoadingAction } from '../../actions/AppActions/actionCreators';

const mapStateToProps = state => ({
    asRequestListData: state.otherReducer.asRequestListData,
})

const mapDispatchToProps = dispatch => ({
    navigateToSupportViewScreen: (params) => dispatch(navigateToSupportViewScreenAction(params)),
    navigateToSupportWriteScreen: (params) => dispatch(navigateToSupportWriteScreenAction(params)),
    asRequestListRequest: (params) => dispatch(asRequestListRequestAction(params)),
    startLoading: () => dispatch(startLoadingAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportCenterComponent)