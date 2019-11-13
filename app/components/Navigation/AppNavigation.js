import RootStack from '../../RootStack'
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

createReactNavigationReduxMiddleware(
    state => state.navigationReducer,
    'root',
)

const App = createReduxContainer(RootStack, 'root');

const mapStateToProps = state => ({
    state: state.navigationReducer,
});

const AppNavigation = connect(mapStateToProps)(App);

export default AppNavigation