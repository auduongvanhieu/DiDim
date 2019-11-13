import { connect } from 'react-redux'
import LoginComponent from '../../components/Auth/LoginComponent'
import { getTokenRequestAction, verifyRequestAction } from '../../actions/AuthActions/actionCreators';
import { submit } from 'redux-form'
import { authorizeRequestAction } from '../../actions/AuthActions/actionCreators';
import { navigateToStatusInfoScreenAction } from '../../actions/NavigationActions/actionCreators';

const mapStateToProps = state => ({
    isAutoLogin: state.autoLoginReducer.isAutoLogin,
    getTokenData: state.getTokenReducer.receivedData,
})

const mapDispatchToProps = dispatch => ({
    submitLoginForm: () => dispatch(submit('LoginForm')),
    navigateToStatusInfoScreen: (params) => dispatch(navigateToStatusInfoScreenAction(params)),
    getTokenRequest: (params) => dispatch(getTokenRequestAction(params)),
    verifyRequest: (params) => dispatch(verifyRequestAction(params)),
    authorizeRequest: (params) => dispatch(authorizeRequestAction(params)),

})

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)