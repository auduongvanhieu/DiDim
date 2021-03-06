import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { Text, Button } from "native-base";
import AppNavigation from "./AppNavigation";
import { Config } from "../../utilities/Config";
import SplashScreen from "react-native-splash-screen";
import DropdownAlert from "react-native-dropdownalert";
import { normalize } from "../../utilities/ThemeUtils";
import firebase from "react-native-firebase";

export default class NavigationComponent extends Component {

  constructor(props) {
    super(props);
    this.state={
      notificationData: undefined
    }
  }

  componentWillMount() {}

  componentDidMount() {
    const {} = this.props;
    SplashScreen.hide();

    // Firebase
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }


  componentWillUnmount() {
    // Firebase
    this.notificationListener;
    this.notificationOpenedListener;
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.serverListData && nextProps.serverListData != this.props.serverListData && this.state.notificationData){
      const {title, text, cate, idx } = this.state.notificationData;
      Alert.alert(
        title,
        text,
        [
          {
            text: "Confirm",
            style: "destructive",
            onPress: () => {
              const {
                navigateToAlarmLogDetailScreen,
                failureAlarmLogDetailRequest,
                navigateToSupportViewScreen,
                asRequestDetailRequest
              } = this.props;   
              this.setState({notificationData: undefined}, ()=>{
                if(cate=="ALARM"){
                  navigateToAlarmLogDetailScreen();
                  failureAlarmLogDetailRequest({Par: `cmd=GET_INFO_ALARM_DOWN_LOG&log_uid=${idx}`})  
                } else {
                  navigateToSupportViewScreen({board_idx: idx});
                  asRequestDetailRequest({Par: `cmd=GET_INFO_AS_REQUEST&board_idx=${idx}`})
                }
              })
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  // Start firebase
  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    fcmToken = await firebase.messaging().getToken();
    console.log("__fcm__",fcmToken)
    Config.fcmToken = fcmToken;
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {}
  }

  async createNotificationListeners() {
    /*
     * Setup notify
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        console.log("__notification__", notification);
        const { title, text } = notification.data;
        const localNotification = new firebase.notifications.Notification()
          .setSound("default")
          .setNotificationId(notification.notificationId)
          .setTitle(title)
          .setBody(text)
          .android.setChannelId("fcm_FirebaseNotifiction_default_channel") // e.g. the id you chose above
          .android.setSmallIcon("@mipmap/ic_launcher") // create this icon in Android Studio
          .android.setColor("yellow") // you can set a color here
          .android.setPriority(firebase.notifications.Android.Priority.High);
        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));

      /*
      * Hiện thông khi đang mở app
      * */
      this.setState({notificationData: notification.data})
      if(this.props.serverListData){
        const {title, text, cate, idx } = this.state.notificationData;
        Alert.alert(
          title,
          text,
          [
            {
              text: "Confirm",
              style: "destructive",
              onPress: () => {
                const {
                  navigateToAlarmLogDetailScreen,
                  failureAlarmLogDetailRequest,
                  navigateToSupportViewScreen,
                  asRequestDetailRequest
                } = this.props;   
                this.setState({notificationData: undefined}, ()=>{
                  if(cate=="ALARM"){
                    navigateToAlarmLogDetailScreen();
                    failureAlarmLogDetailRequest({Par: `cmd=GET_INFO_ALARM_DOWN_LOG&log_uid=${idx}`})  
                  } else {
                    navigateToSupportViewScreen({board_idx: idx});
                    asRequestDetailRequest({Par: `cmd=GET_INFO_AS_REQUEST&board_idx=${idx}`})
                  }
                })
              }
            }
          ],
          { cancelable: false }
        );
      }
    });

    const channel = new firebase.notifications.Android.Channel(
      "fcm_FirebaseNotification_default_channel",
      "Demo app name",
      firebase.notifications.Android.Importance.High
    )
      .setDescription("Demo app description")
      .setSound("default");
    firebase.notifications().android.createChannel(channel);

    /*
     * Khi app đang ở trạng thái background, nhận được thông báo, nhấn vào thông báo, hiện thông báo trên app
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notification => {
        this.setState({notificationData: notification.data})
        if(this.props.serverListData){
          const {title, text, cate, idx } = this.state.notificationData;
          Alert.alert(
            title,
            text,
            [
              {
                text: "Confirm",
                style: "destructive",
                onPress: () => {
                  const {
                    navigateToAlarmLogDetailScreen,
                    failureAlarmLogDetailRequest,
                    navigateToSupportViewScreen,
                    asRequestDetailRequest
                  } = this.props;   
                  this.setState({notificationData: undefined}, ()=>{
                    if(cate=="ALARM"){
                      navigateToAlarmLogDetailScreen();
                      failureAlarmLogDetailRequest({Par: `cmd=GET_INFO_ALARM_DOWN_LOG&log_uid=${idx}`})  
                    } else {
                      navigateToSupportViewScreen({board_idx: idx});
                      asRequestDetailRequest({Par: `cmd=GET_INFO_AS_REQUEST&board_idx=${idx}`})
                    }
                  })
                }
              }
            ],
            { cancelable: false }
          );
        }
      });

    /*
     * Khi app đang đóng, nhận được thông báo, nhấn vào thông báo, hiện thông báo trên app
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      this.setState({notificationData: notificationOpen.notification._data})
    }
  }

  renderCenterLoading = () => {
    const { isLoading } = this.props;
    if (Boolean(isLoading))
      return (
        <View
          style={{
            flex: 1,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <ActivityIndicator color="#ffffff" size="small" />
            <Text style={{ color: "#ffffff", marginLeft: 8 }}>Loading...</Text>
          </View>
        </View>
      );
    else return null;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigation />
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        {this.renderCenterLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  modalContainer: {
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: normalize(8),
    padding: normalize(25)
  },
  innerContainer: {
    alignItems: "center"
  }
});
