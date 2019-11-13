import { connect } from 'react-redux'
import StatusInfoComponent from '../../components/StatusInfo/StatusInfoComponent'
import { navigateToServerDetailScreenAction } from '../../actions/NavigationActions/actionCreators';
import { 
    changeTabIndexServerDetailAction,
    serverListRequestAction,
    serverDetailRequestAction,
    serverCountingRequestAction,
    alarmItemListRequestAction,
} from '../../actions/OthersActions/actionCreators';
import { startLoadingAction } from '../../actions/AppActions/actionCreators';

const mapStateToProps = state => ({
    serverListData: state.otherReducer.serverListData,
    serverCountingData: state.otherReducer.serverCountingData,
})

const mapDispatchToProps = dispatch => ({
    navigateToServerDetailScreen: (params) => dispatch(navigateToServerDetailScreenAction(params)),
    changeTabIndexServerDetail: (index) => dispatch(changeTabIndexServerDetailAction(index)),
    serverListRequest: (index) => dispatch(serverListRequestAction(index)),
    serverDetailRequest: (index) => dispatch(serverDetailRequestAction(index)),
    serverCountingRequest: (params) => dispatch(serverCountingRequestAction(params)),
    alarmItemListRequest: (params) => dispatch(alarmItemListRequestAction(params)),
    startLoading: () => dispatch(startLoadingAction()),

})

export default connect(mapStateToProps, mapDispatchToProps)(StatusInfoComponent)