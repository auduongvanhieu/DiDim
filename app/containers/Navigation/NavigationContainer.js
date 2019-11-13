import { connect } from 'react-redux'
import NavigationComponent from '../../components/Navigation/NavigationComponent';

const mapStateToProps = state => ({
    alert: state.app.alert,
    isLoading: state.app.isLoading,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationComponent)