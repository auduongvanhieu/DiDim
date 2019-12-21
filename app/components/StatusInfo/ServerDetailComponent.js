import React, { Component } from "react";
import I18n from "../../I18n";
import { Container, Tab, Tabs, TabHeading } from "native-base";
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
  Button,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { normalize } from "../../utilities/ThemeUtils";
import { AppColors, AppConstant } from "../../utilities/Constants";
import StatusButton from "../CustomView/StatusButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderMenu from "../CustomView/HeaderMenu";
import { Images } from "../../assets";
import ModalDropdown from "react-native-modal-dropdown";
import { Config, SuperObjects } from "../../utilities/Config";
import { WebView } from "react-native-webview";
import {
  generateStatusText,
  generateStatusColor
} from "../../utilities/Helper";
import NoDataView from "../CustomView/NoDataView";
import Carousel, { Pagination } from "react-native-snap-carousel";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const aspecRatio = screenHeight / screenWidth;

const hours = [
  { title: I18n.t('recent') + "1" + I18n.t('hour'), value: "1H" },
  { title: I18n.t('recent') + "3" + I18n.t('hours'), value: "3H" },
  { title: I18n.t('recent') + "6" + I18n.t('hours'), value: "6H" },
  { title: I18n.t('recent') + "1" + I18n.t('day'), value: "1D" },
  { title: I18n.t('recent') + "3" + I18n.t('days'), value: "3D" },
  { title: I18n.t('recent') + "7" + I18n.t('days'), value: "7D" },
  { title: I18n.t('recent') + "30" + I18n.t('days'), value: "30D" }
];

const titleLinuxTop = ["CPU", "Load", "Tcp Connect", "Disk Free Space"];
const deviceLinuxTop = ["cpu", "loadavg", "tcpconn", "df"];

const titleLinuxBottom = ["Memory", "Swap", "UpTime"];
const deviceLinuxBottom = ["mem", "swap", "uptime"];

const titleWinTop = ["CPU", "Tcp Connect", "Disk Free Space"];
const deviceWinTop = ["cpu", "tcpconn", "df"];

const titleWinBottom = ["Memory", "UpTime"];
const deviceWinBottom = ["mem", "uptime"];

export default class ServerDetailComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      hourIndex: 3,
      visibleLoadingTop: true,
      visibleLoadingBottom: true,
    };
  }

  hideLoadingTop() {
    this.setState({ visibleLoadingTop: false });
  }

  hideLoadingBottom() {
    this.setState({ visibleLoadingBottom: false });
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor(AppColors.headerBg2);
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tab) {
      this.setState({
        visibleLoadingTop: true,
        visibleLoadingBottom: true,
        hourIndex: 3,
        activeSlide: 0
        // indexGraphTop: 0,
        // indexGraphBottom: 0
      });
    }
  }

  _dropdown_renderRow = (option, index, isSelected) => {
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
            alignSelf: "center"
          }}
        >
          {option.title}
        </Text>
      </View>
    );
  };

  _renderGraphItem = ({ item, index }) => {
    const {navData} = this.props;
    return ( navData && (
      <View>
        {/** TITLE TOP*/}
          <View style={styles.containerHeaderTab2}>
            <Text style={styles.textTitleHeaderTab2}>
              {navData.os == "L" ? titleLinuxTop[index] : titleWinTop[index]}
            </Text>
          </View>
        {/** GRAPHQL */}
        {this._renderItemTop({ item, index })}
        {/** TITLE BOTTOM*/}
        { ((navData.os == "L" && index!=3) || (navData.os == "W" && index!=2)) &&
          <View style={styles.containerHeaderTab2}>
            <Text style={styles.textTitleHeaderTab2}>
              {navData.os == "L" ? titleLinuxBottom[index] : titleWinBottom[index]}
            </Text>
          </View>
        }
        {/** GRAPHQL */}
        { ((navData.os == "L" && index!=3) || (navData.os == "W" && index!=2)) && 
          this._renderItemBottom({ item, index })}
      </View>
    )) || null;
  };

  _renderItemTop = ({ item, index }) => {
    const { navData } = this.props;
    const { hourIndex } = this.state;
    return (
      <View>
        <View style={{ height: screenHeight / 4, backgroundColor: "white" }}>
          <View style={styles.containerChart}>
            {navData && (
              <WebView
                source={{
                  uri: `${Config.graphURL}?access_token=${
                    Config.sAccessToken
                  }&gno=${navData.gno}&device=${
                    navData.os == "L"
                      ? deviceLinuxTop[index]
                      : deviceWinTop[index]
                  }&period=${hours[hourIndex].value}`
                }}
                style={{ width: "185%", height: "150%" }}
                onLoad={() => this.hideLoadingTop()}
              />
            )}
            {this.state.visibleLoadingTop && (
              <ActivityIndicator
                style={{ position: "absolute", top: "40%", left: "45%" }}
                size="large"
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  _renderItemBottom = ({ item, index }) => {
    const { navData } = this.props;
    const { hourIndex } = this.state;
    return (
      <View>
        <View style={{ height: screenHeight / 4, backgroundColor: "white" }}>
          <View style={styles.containerChart}>
            {navData && (
              <WebView
                source={{
                  uri: `${Config.graphURL}?access_token=${
                    Config.sAccessToken
                  }&gno=${navData.gno}&device=${
                    navData.os == "L"
                      ? deviceLinuxBottom[index]
                      : deviceWinBottom[index]
                  }&period=${hours[hourIndex].value}`
                }}
                style={{ width: "185%", height: "150%" }}
                onLoad={() => this.hideLoadingBottom()}
              />
            )}
            {this.state.visibleLoadingBottom && (
              <ActivityIndicator
                style={{ position: "absolute", top: "40%", left: "45%" }}
                size="large"
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  get pagination () {
    const { activeSlide } = this.state;
    const { navData } = this.props;
    return (
        <Pagination
          dotsLength={navData && navData.os == "L"
          ? deviceLinuxTop.length
          : deviceWinTop.length}
          activeDotIndex={activeSlide}
          containerStyle={{margin: -20}}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 10,
              marginHorizontal: 0,
              backgroundColor: 'black'
          }}
          inactiveDotStyle={{
              width: 10,
              height: 10,
              borderRadius: 10,
              marginHorizontal: 0,
              backgroundColor: 'black'          
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />);
    }

  /**
   * Render views
   */
  render() {
    const {
      tab,
      changeTabIndexServerDetail,
      navData,
      serverDetailData,
      alarmItemListData,

      navigateToAlarmLogDetailScreen,
      failureAlarmLogDetailRequest
    } = this.props;
    const { hourIndex/*, indexGraphTop, indexGraphBottom*/ } = this.state;
    return (
      <Container>
        {/* {serverDetailData && console.log("__haha__",JSON.stringify(serverDetailData))} */}
        <StatusBar backgroundColor={AppColors.headerBg2} />
        <HeaderMenu title={I18n.t('infra')} />
        <View style={{ paddingVertical: "4%", paddingHorizontal: "7%" }}>
          <Text style={{ fontSize: normalize(19), color: "#140f26" }}>
            {serverDetailData && serverDetailData.guest_name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <StatusButton
              title={navData && generateStatusText(navData.status)}
              bgColor={navData && generateStatusColor(navData.status)}
            />
            <Text style={{ width: "80%", marginLeft: 10 }}>
              {"IP " + (serverDetailData && serverDetailData.ip)}
            </Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: "#f4f6f9", height: "2.5%", width: "100%" }}
        />
        <View style={{ height: 50, width: "100%", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => changeTabIndexServerDetail(0)}
            style={{
              justifyContent: "center",
              flex: 1,
              borderBottomColor: "#1c162e",
              borderBottomWidth: tab == 0 ? 5 : 0
            }}
          >
            <Text
              style={{
                color: tab == 0 ? "#140f26" : "#6c7b8a",
                fontWeight: tab == 0 ? "bold" : "normal",
                fontSize: normalize(17),
                alignSelf: "center"
              }}
            >
              {I18n.t('info')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeTabIndexServerDetail(1)}
            style={{
              justifyContent: "center",
              flex: 1,
              borderBottomColor: "#1c162e",
              borderBottomWidth: tab == 1 ? 5 : 0
            }}
          >
            <Text
              style={{
                color: tab == 1 ? "#140f26" : "#6c7b8a",
                fontWeight: tab == 1 ? "bold" : "normal",
                fontSize: normalize(17),
                alignSelf: "center"
              }}
            >
              {I18n.t('graph')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeTabIndexServerDetail(2)}
            style={{
              justifyContent: "center",
              flex: 1,
              borderBottomColor: "#1c162e",
              borderBottomWidth: tab == 2 ? 5 : 0
            }}
          >
            <Text
              style={{
                color: tab == 2 ? "#140f26" : "#6c7b8a",
                fontWeight: tab == 2 ? "bold" : "normal",
                fontSize: normalize(17),
                alignSelf: "center"
              }}
            >
              {I18n.t('alarm')}
            </Text>
          </TouchableOpacity>
        </View>
        {tab == 0 && serverDetailData && (
          <ScrollView style={styles.containerTab}>
            <View style={styles.itemContainer}>
              <Text style={styles.textLeft}>{I18n.t('serverName')}</Text>
              <Text style={styles.textRight}>
                {serverDetailData.guest_name}
              </Text>
            </View>
            <View style={styles.horizontalBar} />
            <View style={styles.itemContainer}>
              <Text style={styles.textLeft}>{I18n.t('serverIp')}</Text>
              <Text style={styles.textRight}>{serverDetailData.ip}</Text>
            </View>
            <View style={styles.horizontalBar} />
            <View style={styles.itemContainer}>
              <Text style={styles.textLeft}>{I18n.t('os')}</Text>
              <Text style={styles.textRight}>{serverDetailData.os_type}</Text>
            </View>
            <View style={styles.horizontalBar} />
            <View style={styles.itemContainer}>
              <Text style={styles.textLeft}>{I18n.t('datacenter')}</Text>
              <Text style={styles.textRight}>{serverDetailData.dc_name}</Text>
            </View>
            <View style={styles.horizontalBar} />
            <View style={styles.itemContainer}>
              <Text style={styles.textLeft}>{I18n.t('serverSpec')}</Text>
              <Text style={styles.textRight}>{serverDetailData.hw_spec}</Text>
            </View>
            <View style={styles.horizontalBar} />
            <View style={styles.itemContainer}>
              <Text style={styles.textLeft}>{I18n.t('productTypes')}</Text>
              <Text style={styles.textRight}>{serverDetailData.prod_gubn}</Text>
            </View>
            <View style={styles.horizontalBar} />
          </ScrollView>
        )}
        {tab == 1 && (
          <View style={styles.containerTab}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10
              }}
            >
              <View style={{ flex: 1 }} />
              <Text style={{ fontSize: AppConstant.textMainSize }}>
                Time Zone:{" "}
              </Text>
              <View style={styles.containerPicker}>
                <ModalDropdown
                  options={hours}
                  style={{ justifyContent: "center", flex: 1, height: "100%" }}
                  dropdownStyle={{ height: normalize(202), marginTop: 10 }}
                  defaultValue={hours[hourIndex].title}
                  defaultIndex={hourIndex}
                  onSelect={index => {
                    this.setState({
                      hourIndex: index,
                      visibleLoadingTop: true,
                      visibleLoadingBottom: true
                    });
                  }}
                  textStyle={{
                    fontSize: normalize(13),
                    color: "#3b3b4d",
                    fontWeight: "bold"
                  }}
                  renderRow={this._dropdown_renderRow}
                  renderButtonText={rowData => <Text>{rowData.title}</Text>}
                  showsVerticalScrollIndicator={false}
                />
                <FontAwesome size={20} name="angle-down" />
              </View>
            </View>
            { this.pagination }
            <ScrollView>
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={
                    navData && navData.os == "L"
                    ? deviceLinuxTop
                    : deviceWinTop
                }
                renderItem={this._renderGraphItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
              />
            </ScrollView>
          </View>
        )}
        {tab == 2 && (
          <View style={styles.containerTab}>
            {/* {alarmItemListData && console.log("__haha__",JSON.stringify(alarmItemListData))} */}
            <FlatList
              data={alarmItemListData}
              ItemSeparatorComponent={() => (
                <View style={styles.horizontalBar} />
              )}
              ListFooterComponent={() => <View style={styles.horizontalBar} />}
              ListEmptyComponent={<NoDataView />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    marginHorizontal: 20,
                    paddingVertical: normalize(15)
                  }}
                  onPress={() => {
                    navigateToAlarmLogDetailScreen();
                    failureAlarmLogDetailRequest({
                      Par: `cmd=GET_INFO_ALARM_DOWN_LOG&log_uid=${item.log_uid}`
                    });
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{ width: normalize(50), flexDirection: "row" }}
                    >
                      <StatusButton
                        style={{ marginHorizontal: 5 }}
                        bgColor={generateStatusColor(item.status)}
                        widthSize={normalize(10)}
                        title={item.status}
                      />
                    </View>
                    <Text
                      style={{
                        flex: 1,
                        textAlign: "right",
                        fontSize: normalize(9)
                      }}
                    >
                      {item.occur_time + " "}
                    </Text>
                    <Image
                      source={Images.ico_clock}
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
                    {item.alarm_name}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        )}
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
    fontSize: normalize(13),
    width: "35%"
  },
  textRight: {
    color: "#3b3b4d",
    fontSize: normalize(13),
    marginLeft: 5
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
  containerHeaderTab2: {
    backgroundColor: "#f4f6f9",
    paddingLeft: 20,
    paddingVertical: 10
  },
  textTitleHeaderTab2: {
    color: "#6c7b8a",
    fontWeight: "bold",
    fontSize: AppConstant.textMenuSize
  },
  containerChart: {
    margin: 10,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 15
  },
  containerPicker: {
    height: normalize(30),
    width: normalize(100),
    backgroundColor: "#f2f2f4",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center"
  }
});
