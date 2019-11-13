import { connect } from 'react-redux'
import ServerDetailComponent from '../../components/StatusInfo/ServerDetailComponent'
import { submit } from 'redux-form'
import { fetchLoginAction } from '../../actions/AuthActions/actionCreators';
import { changeTabIndexServerDetailAction, serverDetailRequestAction } from '../../actions/OthersActions/actionCreators';

const mapStateToProps = state => ({
    navData: state.navigationReducer.data,
    tab: state.otherReducer.tabIndexServerDetail,
    serverDetailData: state.otherReducer.serverDetailData,
    alarmItemListData: state.otherReducer.alarmItemListData,
})

const mapDispatchToProps = dispatch => ({
    fetchLoginAction: (params) => dispatch(fetchLoginAction(params)),
    changeTabIndexServerDetail: (params) => dispatch(changeTabIndexServerDetailAction(params)),
    serverDetailRequest: (index) => dispatch(serverDetailRequestAction(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ServerDetailComponent)