import { connect } from 'react-redux'
import SupportViewComponent from '../../components/SupportCenter/SupportViewComponent'
import { navigateToAlarmLogDetailScreenAction, navigateToSupportCenterScreenAction } from '../../actions/NavigationActions/actionCreators';
import { asRequestListRequestAction } from '../../actions/OthersActions/actionCreators';

const mapStateToProps = state => ({
    asRequestListData: state.otherReducer.asRequestListData,
})

const mapDispatchToProps = dispatch => ({
    navigateToSupportCenterScreen: (params) => dispatch(navigateToSupportCenterScreenAction(params)),
    asRequestListRequest: (params) => dispatch(asRequestListRequestAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportViewComponent)