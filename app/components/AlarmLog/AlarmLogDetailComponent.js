import React, { Component } from "react";
import I18n from "../../I18n";
import { 
  Container, 
  Tab, 
  Tabs,
  TabHeading
} from "native-base";
import {
  View,
  Dimensions,
  FlatList,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  Picker,
  Image,
} from "react-native";
import { normalize } from "../../utilities/ThemeUtils";
import { AppColors, AppConstant } from "../../utilities/Constants";
import StatusButton from "../CustomView/StatusButton";
import HeaderMenu from "../CustomView/HeaderMenu";
import { Images } from "../../assets";
import { generateStatusColor } from "../../utilities/Helper";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const aspecRatio = screenHeight / screenWidth;

const listAlarm = [
  {alarmType: 'DOWN', alarmName: 'http://21.21.15.5/mon/toring.html', 'failureTime': '2019-09-09 11:13:00', color: AppColors.statusDown},
  {alarmType: 'DOWN', alarmName: 'HTTP Concurrent Users 이상 성능', 'failureTime': '2019-09-09 11:13:00', color: AppColors.statusDown},
  {alarmType: 'UP', alarmName: 'Used Memory (-buffers/cache) 이상 성능', 'failureTime': '2019-09-09 11:13:00', color: AppColors.statusUp},
  {alarmType: 'DOWN', alarmName: 'CPU Utilization 임계 성능', 'failureTime': '2019-09-09 11:13:00', color: AppColors.statusDown},
]

export default class AlarmLogDetailComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state={
      hour: ""
    }
  }

  componentDidMount(){
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(AppColors.headerBg2);
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  /**
   * Render views
   */
  render() {
    const {navigateToAlarmLogScreen, failureAlarmLogDetailData} = this.props;
    return (
      <Container>
      {/* {failureAlarmLogDetailData && console.log("__haha__",JSON.stringify(failureAlarmLogDetailData))} */}
        <StatusBar backgroundColor={AppColors.headerBg2}/>
        <HeaderMenu backAction={()=>navigateToAlarmLogScreen()} title={"Alarm Log"} />
        <View style={{paddingVertical: '4%', paddingHorizontal: '7%'}}>
          <Text style={{fontSize: normalize(18), color: '#140f26'}}>{failureAlarmLogDetailData && failureAlarmLogDetailData.target_name}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: normalize(50), flexDirection: 'row'}}>
              <StatusButton title={failureAlarmLogDetailData && failureAlarmLogDetailData.status} bgColor={failureAlarmLogDetailData && generateStatusColor(failureAlarmLogDetailData.status)}/>
            </View>
            <Image source={Images.ico_clock_b} style={{height: normalize(15), width: normalize(15),  marginLeft: 10}} />
            <Text style={{fontSize: normalize(12), alignSelf: 'center'}}> {failureAlarmLogDetailData && failureAlarmLogDetailData.end_time}</Text>
          </View>
        </View>
        <View style={{backgroundColor: '#f4f6f9', height: '2.5%', width: '100%'}} />
        <View style={{height: normalize(60)}}>
          <View style={{borderColor: '#1c162e', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 3, width: '33%', height: '100%'}}>
            <Text style={{color: '#140f26', fontSize: normalize(16), fontWeight: 'bold'}}>INFO</Text>
          </View>
        </View>
        <ScrollView style={styles.containerTab}>
          <View style={styles.itemContainer}>
            <Text style={styles.textLeft}>Server name</Text>
            <Text style={styles.textRight}>{failureAlarmLogDetailData && failureAlarmLogDetailData.target_name}</Text>
          </View>
          <View style={styles.horizontalBar} />
          <View style={styles.itemContainer}>
            <Text style={styles.textLeft}>Server IP</Text>
            <Text style={styles.textRight}>{failureAlarmLogDetailData && failureAlarmLogDetailData.target_ip}</Text>
          </View>
          <View style={styles.horizontalBar} />
          <View style={styles.itemContainer}>
            <Text style={styles.textLeft}>Monitoring Type</Text>
            <Text style={styles.textRight}>{failureAlarmLogDetailData && failureAlarmLogDetailData.alarm_type}</Text>
          </View>
          <View style={styles.horizontalBar} />
          <View style={styles.itemContainer}>
            <Text style={styles.textLeft}>Send Time</Text>
            <Text style={styles.textRight}>{failureAlarmLogDetailData && failureAlarmLogDetailData.start_time}</Text>
          </View>
          <View style={styles.horizontalBar} />
          <View style={styles.itemContainer}>
            <Text style={styles.textLeft}>Details</Text>
            <Text style={styles.textRight}>{failureAlarmLogDetailData && failureAlarmLogDetailData.message + "\n"}</Text>
          </View>
          <View style={styles.horizontalBar} />
        </ScrollView>     
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(20)
  },
  textLeft: {
    color: "#949ea5",
    fontSize: normalize(14),
    width: "35%"
  },
  textRight: {
    color: "#3b3b4d",
    fontSize: normalize(15),
    marginLeft: 10,
    flex: 1
  },
  containerTab: {
    borderColor: "#6c7b8a",
    borderTopWidth: 0.5,
    flex: 1
  },
  horizontalBar: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#6c7b8a"
  },
});