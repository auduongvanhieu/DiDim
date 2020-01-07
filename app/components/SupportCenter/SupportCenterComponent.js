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

export default class SupportCenterComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      timeZone: "",
      isRefreshing: false
    }
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(AppColors.headerBg);

      const { asRequestListRequest, startLoading } = this.props;
      startLoading();
      asRequestListRequest({ Par: 'cmd=GET_LIST_AS_REQUEST' })
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.asRequestListData && nextProps.asRequestListData != this.props.asRequestListData){
      this.setState({ isRefreshing: false });
    }
  }

  onRefresh() {
    this.setState({ isRefreshing: true });

    const { asRequestListRequest } = this.props;
    asRequestListRequest({ Par: 'cmd=GET_LIST_AS_REQUEST' })
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
      startLoading,
      asRequestRegistrationInit
    } = this.props;
    return (
      <Container>
        <StatusBar backgroundColor={AppColors.headerBg} />
        {/* {asRequestListData && console.log("__haha__",JSON.stringify(asRequestListData))} */}
        <HeaderMenuHome
          title={I18n.t('supportCenter')}
          iconRight={
            <TouchableOpacity
              onPress={() => {
                asRequestRegistrationInit({ data: (new Date()) })
                navigateToSupportWriteScreen()
              }}
              style={{ marginLeft: 10 }}>
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
          refreshing= {this.state.isRefreshing}
          onRefresh = {this.onRefresh.bind(this)}
          data={asRequestListData}
          ItemSeparatorComponent={() => <View style={styles.horizontalBar} />}
          ListFooterComponent={() => <View style={styles.horizontalBar} />}
          ListHeaderComponent={() => <View style={styles.horizontalBar} />}
          ListEmptyComponent={<NoDataView />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                startLoading()
                navigateToSupportViewScreen({ board_idx: item.board_idx });
                asRequestDetailRequest({ Par: `cmd=GET_INFO_AS_REQUEST&board_idx=${item.board_idx}` })
              }}
              style={{ marginHorizontal: 20, paddingVertical: normalize(15) }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: normalize(60), flexDirection: "row" }}>
                  <StatusButton
                    style={{ marginHorizontal: 5 }}
                    bgColor={generateNameColor(item.work_status_name)}
                    widthSize={normalize(10)}
                    title={I18n.t(`${item.work_status_name}`)}
                  />
                </View>
                {item.cmt_cnt > 0 &&
                  <View style={{ width: normalize(40), flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>

                    <StatusButton
                      style={{ marginHorizontal: 5 }}
                      bgColor={generateCommentColor(item.work_status_name)}
                      widthSize={normalize(10)}
                    >
                      <Image
                        source={Images.ico_msg}
                        style={{ height: normalize(6), width: normalize(6) }}
                      />
                      <Text style={{
                        fontSize: normalize(8),
                        marginLeft: normalize(2),
                        color: 'white'
                      }}>
                        {item.cmt_cnt}
                      </Text>
                    </StatusButton>

                  </View>
                }
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontSize: normalize(9),
                    marginRight: normalize(2)
                  }}
                >
                  {item.writeday}
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
                numberOfLines={1}
                ellipsizeMode='tail'
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
    height: 1,
    width: "100%",
    backgroundColor: "#6c7b8a",
    opacity: 0.2
  },
  horizontalBar2: {
    height: 2,
    width: "100%",
    backgroundColor: "#76848b",
    opacity: 0.4
  },
});