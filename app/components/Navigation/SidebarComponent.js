import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Platform,
  Switch,
  StatusBar
} from "react-native";
import { Container, Content, Accordion } from "native-base";
import styles from "../../styles/Sidebar/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../../assets'
import I18n  from '../../I18n'
import { AppColors, AppConstant } from "../../utilities/Constants";
import { normalize } from "../../utilities/ThemeUtils";
import LabeledSwitch from "../CustomView/LabeledSwitch";
import { clearAuthCache, getReceiveNotify, setReceiveNotify, getAutoLogin, setAutoLogin, setObjectToken } from "../../utilities/Helper";
import { Config } from "../../utilities/Config";

class SidebarComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      expanded: false,
      switchValue: true,
      key: ""
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.verifyData){
      const {verifyData} = nextProps;
      if(verifyData.ReturnValue) {
        this.setState({key: verifyData.ReturnMsg});
      }
    }
    if(nextProps.authorData){
      const {authorData} = nextProps;
      if(authorData.ReturnValue) {
        this.setState({key: authorData.ReturnMsg});
      }
    }
  }

  async componentDidMount() {
    const isReceiveNotify = await getReceiveNotify();
    if( isReceiveNotify == 'false'){
      this.setState({switchValue: false});
    }
  }

  toggleSwitch = value => {
    setReceiveNotify(value);
    this.setState({ switchValue: value });
  };

  render() {
    const {
      closeNavigationDrawer,
      navigateToLoginScreen,
      replaceToLoginScreen,
      navigateToStatusInfoScreen,
      navigateToAlarmLogScreen,
      navigateToSupportCenterScreen,
      disposeRequest, 
      serverCountingRequest,
      asRequestListRequest
    } = this.props;
    return (
      <Container style={styles.menuContainer}>
      <View style={{ width: '100%', backgroundColor: 'transparent' }}>
        <TouchableOpacity onPress={()=>{}} style={styles.userProfiles}>
          <Image
            style={styles.userImageStyle}
            source={require('../../assets/pf_thumb.png')}
          />
          <View style={styles.userDetailsStyle}>
            <Text style={styles.userDetailsText}>
              {Config.userName}
            </Text>
            <Text style={[styles.userDetailsText,{ fontWeight: 'normal', fontSize: normalize(11), color: AppColors.textHolder }]}>
              Didimcenter TM
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: normalize(20)}}>
        <View style={[styles.menuMainView, {marginTop: normalize(12)}]}>
          <TouchableOpacity onPress={() => {
            navigateToStatusInfoScreen();
            closeNavigationDrawer();
            serverCountingRequest({Par: "cmd=GET_COUNT_ALERT_AND_AS"});
          }} >
            <View style={styles.listRow}>
              <Image
                style={styles.imgIcon}
                source={require('../../assets/menu_ico_infra.png')}/>              
              <Text style={styles.rowTxt}>{I18n.t('infraMenu')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigateToAlarmLogScreen();
            closeNavigationDrawer();
            serverCountingRequest({Par: "cmd=GET_COUNT_ALERT_AND_AS"});
            }} >
            <View style={styles.listRow}>
              <Image
                style={styles.imgIcon}
                source={require('../../assets/menu_ico_alarm.png')}/>
              <Text style={styles.rowTxt}>{I18n.t('alarmLogMenu')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigateToSupportCenterScreen();
            closeNavigationDrawer();
            serverCountingRequest({Par: "cmd=GET_COUNT_ALERT_AND_AS"});
            asRequestListRequest({ Par: 'cmd=GET_LIST_AS_REQUEST' });
            }} >
            <View style={styles.listRow}>
              <Image
                style={styles.imgIcon}
                source={require('../../assets/menu_ico_support.png')}/> 
              <Text style={styles.rowTxt}>{I18n.t('supportCenterMenu')}</Text>
            </View>
          </TouchableOpacity>

          <View  >
            <View style={styles.listRow}>
              <Image
                style={styles.imgIcon}
                source={require('../../assets/menu_ico_bell.png')}/> 
              <Text style={styles.rowTxt}>{I18n.t('pushAlarm')}</Text>
              <View style={{flex: 1}}/>
              <LabeledSwitch
                onValueChange={this.toggleSwitch}
                value={this.state.switchValue}
               />
            </View>
          </View>
          <TouchableOpacity onPress={ async () => {
            if(await getAutoLogin() != 'true')
              clearAuthCache();
            else
              setAutoLogin(false);
            navigateToLoginScreen();
            disposeRequest({
              Par: {}
            });
            setObjectToken(null);
          }} >
            <View style={styles.listRow}>
              <Image
                style={styles.imgIcon}
                source={require('../../assets/menu_ico_logout.png')}/> 
              <Text style={styles.rowTxt}>{I18n.t('logout')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
        <View style={{flex:1}}/>
        <View style={{flexDirection: 'row', marginLeft: normalize(30), marginBottom: 20}}>
          <Image style={{width: 18, height: 18,}} source={require('../../assets/ico_key.png')} />
          <Text style={{color:'red', fontSize: 14, }}> {I18n.t('pushAlarmKey')}:  </Text>
        <Text style={{color:'white', fontSize: 14, }}>{this.state.key}</Text>
        </View>
        <Ionicons onPress={()=>closeNavigationDrawer()} style={{position: 'absolute', right: 10, top: 10}} name="md-close" color='white' size={30} />
      </Container>
    );
  }
}

SidebarComponent.propTypes = {
  navigation: PropTypes.object
};

export default SidebarComponent;