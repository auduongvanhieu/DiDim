import { connect } from 'react-redux'
import { navigateToSupportCenterScreenAction } from '../../actions/NavigationActions/actionCreators';
import SupportWriteComponent from '../../components/SupportCenter/SupportWriteComponent';

const mapStateToProps = state => ({
    isLoading: state.app.isLoading,
})

const mapDispatchToProps = dispatch => ({
    navigateToSupportCenterScreen: (params) => dispatch(navigateToSupportCenterScreenAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportWriteComponent)