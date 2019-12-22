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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NoDataView from "../CustomView/NoDataView";
import { generateStatusColor, generateNameColor, generateCommentColor } from "../../utilities/Helper";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const listSupport = [
  {alarmType: 'DOWN', title: "URL", alarmName: '2019년 04월 월간 보고서', 'failureTime': '2019-09-09 11:13:00', color: AppColors.statusDown},
  {alarmType: 'DOWN', title: "web1 server", alarmName: '사이버위협 동향분석 및 접근시도 차단 요청', 'failureTime': '2019-09-09 11:13:00', color: AppColors.statusDown},
  {alarmType: 'UP', title: "db master", alarmName: 'WAS accesslog 저장 불가 현상', 'failureTime': '2019-09-09 11:13:00', color: AppColors.statusUp},
  {alarmType: 'DOWN', title: "db slave", alarmName: '운영 서버 서비스 실행 문의', 'failureTime': '2019-09-09 11:13:00', color: AppColors.statusDown},
]


export default class SupportCenterComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state={
      timeZone: ""
    }
  }

  componentDidMount(){
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(AppColors.headerBg);
    });

    const {asRequestListRequest, startLoading} = this.props;
    startLoading();
    asRequestListRequest({Par: 'cmd=GET_LIST_AS_REQUEST'})
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  /**
   * Render views
   */
  render() {
    const {
      navigateToSupportViewScreen,
      navigateToSupportWriteScreen,
      asRequestListData,
      asRequestDetailRequest,
      startLoading
    } = this.props;
    return (
      <Container>
        <StatusBar backgroundColor={AppColors.headerBg} />
        {/* {asRequestListData && console.log("__haha__",JSON.stringify(asRequestListData))} */}
        <HeaderMenuHome
          title={I18n.t('supportCenter')}
          iconRight={
            <TouchableOpacity
              onPress={()=>navigateToSupportWriteScreen()}
              style={{marginLeft: 10}}>
              <Image
                source={Images.btn_write}
                style={{ color: "white", height: 30, width: 30 }}
              />
            </TouchableOpacity>
          }
        />
        {/* <View style={{marginLeft: 5}}>
          <SearchBox title="Server Name / IP" />
        </View> */}
        <View style={styles.horizontalBar2} />
        <FlatList
          data={asRequestListData}
          ItemSeparatorComponent={() => <View style={styles.horizontalBar} />}
          ListFooterComponent={() => <View style={styles.horizontalBar} />}
          ListHeaderComponent={() => <View style={styles.horizontalBar} />}
          ListEmptyComponent={<NoDataView/>}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                startLoading()
                navigateToSupportViewScreen({board_idx: item.board_idx});
                asRequestDetailRequest({Par: `cmd=GET_INFO_AS_REQUEST&board_idx=${item.board_idx}`})
              }}
              style={{ marginHorizontal: 20, paddingVertical: normalize(15) }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: normalize(55), flexDirection: "row" }}>
                  <StatusButton
                    style={{ marginHorizontal: 5 }}
                    bgColor={generateNameColor(item.work_status_name)}
                    widthSize={normalize(10)}
                    title={I18n.t(`${item.work_status_name}`)}
                  />
                </View>
                { item.cmt_cnt>0 &&
                <View style={{ width: normalize(40), flexDirection: "row" }}>
                  <StatusButton
                    style={{ marginHorizontal: 5 }}
                    bgColor={generateCommentColor(item.work_status_name)}
                    widthSize={normalize(10)}
                    title={"    "+item.cmt_cnt}
                  />
                    <View style={{position: 'absolute', height: '100%', width: normalize(30), justifyContent: 'center'}}>
                    <Image
                      source={Images.ico_msg}
                      style={{ height: normalize(10), width: normalize(10), alignSelf: 'center' }}
                    />
                  </View>
                </View>
                }
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontSize: normalize(9)
                  }}
                >
                  {item.writeday + " "}
                </Text>
                <Image
                  source={Images.ico_clock_b}
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
                {item.title}
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
});