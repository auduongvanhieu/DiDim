import React, { Component } from "react";
import I18n from "../../I18n";
import { 
  Container, 
  Picker,
} from "native-base";
import {
  View,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
} from "react-native";
import { normalize } from "../../utilities/ThemeUtils";
import HeaderMenuHome from "../CustomView/HeaderMenuHome";
import SearchBox from "../CustomView/SearchBox";
import { AppColors, AppConstant } from "../../utilities/Constants";
import StatusButton from "../CustomView/StatusButton";
import { Images } from "../../assets";
import ModalDropdown from 'react-native-modal-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { CheckBox } from "react-native-elements";
import NoDataView from "../CustomView/NoDataView";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const timeZones = [
  { title: "Today", value: "TODAY" },
  { title: "Yesterday", value: "YESTERDAY" },
  { title: "1 week", value: "WEEK" },
  { title: "1 month", value: "1M" },
  { title: "3 month", value: "3M" },
];
export default class AlarmLogComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state={
      timeZoneIndex: 3,
      searchText: ''
    }
  }

  componentDidMount(){
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(AppColors.headerBg);
    });

    const {failureAlarmLogRequest, startLoading} = this.props;
    startLoading();
    failureAlarmLogRequest({Par: `cmd=GET_LIST_ALARM_DOWN_LOG&keyword=${this.state.searchText}&period=${timeZones[this.state.timeZoneIndex].value}`});
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  onChangeSearchText = (text) => {
    const {failureAlarmLogRequest} = this.props;
    this.setState({searchText: text}, ()=>{
      failureAlarmLogRequest({Par: `cmd=GET_LIST_ALARM_DOWN_LOG&keyword=${text}&period=${timeZones[this.state.timeZoneIndex].value}`});
    })
  }

  _dropdown_renderRow = (option,index,isSelected) => {
    return (
      <View
        style={{
          width: normalize(120),
          padding: 10,
          flexDirection: "row",
          justifyContent: "flex-start"
        }}
      >
        <FontAwesome
          size={20}
          color={isSelected ? "#ff3b3b" : "#dae1e9"}
          name={isSelected ? "circle-o" : "circle-thin"}
          style={{ alignSelf: "center" }}
        />
        <Text
          style={{
            marginLeft: 10,
            color: isSelected ? "#1c162e" : "#6c7b8a",
            fontSize: normalize(14),
            fontWeight: "bold",
            alignSelf: 'center'
          }}
        >
          {option.title}
        </Text>
      </View>
    );
  }

  /**
   * Render views
   */
  render() {
    const {
      navigateToAlarmLogDetailScreen,
      failureAlarmLogData,
      failureAlarmLogRequest,
      failureAlarmLogDetailRequest
    } = this.props;
    const {timeZoneIndex, searchText} = this.state;
    return (
      <Container>
      {/* {failureAlarmLogData && console.log("__haha__",JSON.stringify(failureAlarmLogData))} */}
        <StatusBar backgroundColor={AppColors.headerBg} />
        <HeaderMenuHome title={"Alarm Log"} />
        <View style={{ marginLeft: 5 }}>
          <SearchBox title="Server Name / IP" value={searchText} onChangeText={this.onChangeSearchText}/>
        </View>
        <View style={styles.horizontalBar2} />
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <View style={{ flex: 1 }} />
          <Text style={{ fontSize: normalize(14) }}>TimeZone: </Text>
          <View style={styles.containerPicker} >
            <ModalDropdown 
              options={timeZones}
              style={{justifyContent: 'center', flex: 1, height: '100%',}}
              dropdownStyle={{height: normalize(170), marginTop: 10}}
              defaultValue={timeZones[timeZoneIndex].title}
              defaultIndex={timeZoneIndex}
              onSelect={(index)=>{
                this.setState({ timeZoneIndex: index },()=>{
                  failureAlarmLogRequest({Par: `cmd=GET_LIST_ALARM_DOWN_LOG&keyword=${this.state.searchText}&period=${timeZones[index].value}`});
                })
              }}
              textStyle={{fontSize: normalize(13), color: '#3b3b4d', fontWeight: 'bold'}}
              renderRow={this._dropdown_renderRow}
              showsVerticalScrollIndicator={false}
              renderButtonText={rowData => <Text>{rowData.title}</Text>}
            />
            <FontAwesome size={20} name='angle-down' />
          </View>
        </View>
        <FlatList
          data={failureAlarmLogData}
          ItemSeparatorComponent={() => <View style={styles.horizontalBar} />}
          ListFooterComponent={() => <View style={styles.horizontalBar} />}
          ListHeaderComponent={() => <View style={styles.horizontalBar} />}
          ListEmptyComponent={<NoDataView/>}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigateToAlarmLogDetailScreen();
                failureAlarmLogDetailRequest({Par: `cmd=GET_INFO_ALARM_DOWN_LOG&log_uid=${item.log_uid}`})
              }}
              style={{ marginHorizontal: 20, paddingVertical: normalize(15) }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: normalize(50), flexDirection: "row" }}>
                  <StatusButton
                    style={{ marginHorizontal: 5 }}
                    bgColor={item.color}
                    widthSize={normalize(10)}
                    title={item.alarm_type}
                  />
                </View>
                <Text
                  style={{
                    alignSelf: "center",
                    color: "#131315",
                    fontWeight: "bold"
                  }}
                >
                  {item.alarm_name}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontSize: normalize(9)
                  }}
                >
                  {item.start_time + " "}
                </Text>
                <Image
                  source={Images.ico_clock_r}
                  style={{ height: normalize(10), width: normalize(10) }}
                />
              </View>
              <Text
                style={{
                  fontSize: normalize(12),
                  color: "black",
                  marginLeft: 5,
                  marginTop: 5
                }}
              >
                {item.guest_name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  horizontalBar: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#6c7b8a"
  },
  horizontalBar2: {
    height: 1,
    width: "100%",
    backgroundColor: "#76848b"
  },
  containerPicker: {
    height: normalize(30),
    width: normalize(100),
    backgroundColor: "#f2f2f4",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
});