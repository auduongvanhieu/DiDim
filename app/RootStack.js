import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'; 
import { createStackNavigator } from 'react-navigation-stack';
import { Dimensions, View, Text, Image } from 'react-native';
import SidebarContainer from './containers/Sidebar/SidebarContainer';
import LoginContainer from './containers/Auth/LoginContainer';
import StatusInfoContainer from './containers/StatusInfo/StatusInfoContainer';
import ServerDetailContainer from './containers/StatusInfo/ServerDetailContainer';
import AlarmLogContainer from './containers/AlarmLog/AlarmLogContainer';
import AlarmLogDetailContainer from './containers/AlarmLog/AlarmLogDetailContainer';
import SupportCenterContainer from './containers/SupportCenter/SupportCenterContainer';
import SupportViewContainer from './containers/SupportCenter/SupportViewContainer';
import SupportWriteContainer from './containers/SupportCenter/SupportWriteContainer';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SidebarNavigation = createDrawerNavigator(
    {
        StatusInfo: { screen: StatusInfoContainer },
        ServerDetail: { screen: ServerDetailContainer },
        AlarmLog: { screen: AlarmLogContainer },
        AlarmLogDetail: { screen: AlarmLogDetailContainer },
        SupportCenter: { screen: SupportCenterContainer },
        SupportView: { screen: SupportViewContainer },
        SupportWrite: { screen: SupportWriteContainer },
    },
    {
        contentComponent: SidebarContainer,
        drawerWidth: Dimensions.get('window').width,
        drawerBackgroundColor: 'transparent',
        headerMode: 'none',
    }
);


const RootStack = createStackNavigator(
    {
        Login: { screen: LoginContainer },
        StatusInfo: {screen: SidebarNavigation},
    },
    {
        headerMode: 'none',
        mode: 'card',
        navigationOptions: {
            gesturesEnabled: false
        }
    }
)

export default RootStack