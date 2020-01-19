import { connect } from 'react-redux'
import LoginComponent from '../../components/Auth/LoginComponent'
import { getTokenRequestAction, verifyRequestAction } from '../../actions/AuthActions/actionCreators';
import { submit, change} from 'redux-form'
import { authorizeRequestAction } from '../../actions/AuthActions/actionCreators';
import { navigateToStatusInfoScreenAction } from '../../actions/NavigationActions/actionCreators';
import { stopLoadingAction } from '../../actions/AppActions/actionCreators';

const mapStateToProps = state => ({
    isAutoLogin: state.autoLoginReducer.isAutoLogin,
    getTokenData: state.getTokenReducer.receivedData,
    authorData: state.login.receivedData,
    veryfyData: state.verifyReducer.receivedData,
})

const mapDispatchToProps = dispatch => ({
    submitLoginForm: () => dispatch(submit('LoginForm')),
    changeLoginForm: (field, value) => dispatch(change('LoginForm', field, value)),
    navigateToStatusInfoScreen: (params) => dispatch(navigateToStatusInfoScreenAction(params)),
    replaceToStatusInfoScreen: (params) => dispatch(replaceToStatusInfoScreenAction(params)),
    getTokenRequest: (params) => dispatch(getTokenRequestAction(params)),
    verifyRequest: (params) => dispatch(verifyRequestAction(params)),
    authorizeRequest: (params) => dispatch(authorizeRequestAction(params)),
    stopLoading: () => dispatch(stopLoadingAction()),

})

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)