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
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Button } from 'react-native-elements';

import { normalize } from "../../utilities/ThemeUtils";
import { AppColors, AppConstant } from "../../utilities/Constants";
import StatusButton from "../CustomView/StatusButton";
import HeaderMenu from "../CustomView/HeaderMenu";
import { Images } from "../../assets";
import { Config } from "../../utilities/Config";
import { generateNameColor } from "../../utilities/Helper";
import AutoHeightWebView from 'react-native-autoheight-webview'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class SupportViewComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      hour: "",
      comment: "",
      listReply: [],
    }
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(AppColors.headerBg2);
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  onPressReply = () => {
    const {
      commentRegistrationRequest,
      navData,
    } = this.props;
    const { comment } = this.state;
    if (comment){
      var submitComment = comment.replace('\n', '</br>')
      commentRegistrationRequest({ Par: `cmd=UPDATE_AS_REQUEST_REPLY&board_idx=${navData.board_idx}&qna_kind=AddComment&write_content=${submitComment}` });
    }
    this.setState({ comment: "" })
  }

  onPressEndTask = () => {
    const {
      commentRegistrationRequest,
      navData,
      navigateToSupportCenterScreen
    } = this.props;
    const { comment } = this.state;
    if (comment)
      commentRegistrationRequest({ Par: `cmd=UPDATE_AS_REQUEST_REPLY&board_idx=${navData.board_idx}&qna_kind=Close&write_content=${comment}` });
    this.setState({ comment: "" })
    // navigateToSupportCenterScreen()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.asRequestDetailData && nextProps.asRequestDetailData != this.props.asRequestDetailData) {
      var values = Object.values(nextProps.asRequestDetailData);
      listReply = [];
      for (i = 0; i < values.length; i++) {
        var value = values[i];
        var content = value.content;
        // content = content.replace(/<p>/g, '');
        // content = content.replace(/<\/p>/g, '\n');
        // content = content.replace(/<br>/g, '');
        if (value.cmt_idx) {
          value.content = content;
          listReply.push(value)
        }
      }
      listReply.sort((a, b) => b.cmt_idx.localeCompare(a.cmt_idx))
      listReply.push(nextProps.asRequestDetailData.content)
      this.setState({ listReply: listReply, comment: "" })
    }

    if (nextProps.commentRegistrationData && nextProps.commentRegistrationData != this.props.commentRegistrationData) {
      const {
        asRequestDetailRequest,
        navData,
      } = this.props;
      if (navData && navData.board_idx)
        asRequestDetailRequest({ Par: `cmd=GET_INFO_AS_REQUEST&board_idx=${navData.board_idx}` })
    }
  }

  /**
   * Render views
   */
  render() {
    const {
      navigateToSupportCenterScreen,
      asRequestDetailData,
    } = this.props;
    const { listReply, mainContent } = this.state;
    return (
      <Container>
        {/* {asRequestDetailData && console.log("__haha__",JSON.stringify(asRequestDetailData))} */}
        {/* {listReply && console.log("__haha__",JSON.stringify(listReply))} */}
        <StatusBar backgroundColor={AppColors.headerBg2} />
        <HeaderMenu
          backAction={() => navigateToSupportCenterScreen()}
          title={I18n.t('supportCenter')}
        />
        <View style={{ paddingVertical: "4%", paddingHorizontal: "7%" }}>
          <Text numberOfLines={1} style={{ fontSize: normalize(18), color: "#140f26" }}>
            {asRequestDetailData && asRequestDetailData.content.title}
          </Text>
          <View style={{ flexDirection: "row", marginTop: Platform.OS == 'ios' ? normalize(6) : 0 }}>
            <View style={{ width: normalize(60), flexDirection: "row" }}>
              <StatusButton title={asRequestDetailData && I18n.t(`${asRequestDetailData.content.work_status_name}`)}
                bgColor={asRequestDetailData && generateNameColor(asRequestDetailData.content.work_status_name)} />
            </View>
            <Image
              source={Images.ico_clock_b}
              style={{ height: normalize(13), width: normalize(13), marginLeft: 10, alignSelf: "center" }}
            />
            <Text style={{ fontSize: normalize(11), alignSelf: "center", color: 'grey' }}>
              {" "}
              {asRequestDetailData && asRequestDetailData.content.writeday}
            </Text>
            <Image
              source={Images.ico_tag}
              style={{ height: normalize(13), width: normalize(13), marginLeft: 10, alignSelf: "center" }}
            />
            <Text style={{ fontSize: normalize(11), alignSelf: "center", color: 'grey' }}>
              {" "}
              {I18n.t('requestTypeTechical')}
            </Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: "#f4f6f9", height: "2.5%", width: "100%" }}
        />
        <View style={{ height: screenHeight / 4.5, backgroundColor: "white" }}>
          <TextInput
            selectTextOnFocus = {true}
            placeholder={I18n.t('supportCenterCommentHint')}
            style={{ fontSize: normalize(13), paddingHorizontal: "7%", marginBottom: 35}}
            value={this.state.comment}
            onChangeText={comment => this.setState({ comment })}
            multiline={true}
          />
          <Image source={Images.bg_ico_msg} style={styles.imgBgMsg} />
          {asRequestDetailData && asRequestDetailData.content.work_status_name != "requestStatusClose" &&
            <View style={styles.containerBtn}>
              {/* <TouchableOpacity style={{
                backgroundColor: "#1c162e",
                paddingHorizontal: normalize(6),
                paddingVertical: normalize(6),
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{ fontSize: normalize(14), color: '#ffffff' }}>{I18n.t('finishWork')}</Text>
              </TouchableOpacity> */}
              <Button
                title={I18n.t('finishWork')}
                onPress={this.onPressEndTask}
                fontSize={normalize(15)}
                buttonStyle={styles.btnEndTask} />
              <Button
                title={I18n.t('reply')}
                onPress={this.onPressReply}
                buttonStyle={styles.btnReply}
                fontSize={normalize(15)}
              />
            </View>
          }
        </View>
        <View style={{ backgroundColor: "#f4f6f9", flex: 1 }}>
          <Text style={styles.textReply}>{I18n.t('reply')}</Text>
          <FlatList
            data={listReply}
            // ListEmptyComponent={<NoDataView/>}
            renderItem={({ item, index }) =>
              item.write_name == Config.userName ? (
                <View>
                  <View style={{ flexDirection: "row", marginTop: index == listReply.length - 1 ? 45 : 30 }}>
                    <Text style={styles.titleComment1}>{item.write_name}</Text>
                    <View style={{ flex: 1 }} />
                    <Text
                      style={{ fontSize: normalize(10), alignSelf: "center" }}
                    >
                      {item.writeday}
                    </Text>
                    <Image source={Images.ico_clock_b} style={styles.clock1} />
                  </View>
                  <View style={[styles.bgComment1, { marginBottom: index == listReply.length - 1 ? 20 : 0 }]}>
                    {/* <Text style={{ color: "white" }}>{item.content}</Text> */}
                    <AutoHeightWebView
                      style={{ width: '100%' }}
                      customScript={`document.body.style.background = 'transparent';`}
                      customStyle={`
                        * {
                          font-family: 'Times New Roman';
                        }
                        p {
                          font-size: 16px;
                        }
                      `}
                      onSizeUpdated={size => { console.log(size.height) }}
                      source={{ html: item.content }}
                      scalesPageToFit={true}
                      zoomable={false}
                      textZoom={200}
                    />
                  </View>
                </View>
              ) : (
                  <View>
                    <View style={{ flexDirection: "row", marginTop: index == listReply.length - 1 ? 45 : 30, marginBottom: index == listReply.length - 1 ? 10 : 0 }}>
                      <Text style={styles.titleComment2}>{item.write_name}</Text>
                      <View style={{ flex: 1 }} />
                      <Text
                        style={{ fontSize: normalize(10), alignSelf: "center" }}
                      >
                        {item.writeday}
                      </Text>
                      <Image source={Images.ico_clock_b} style={styles.clock2} />
                    </View>
                    <View style={[styles.bgComment2, { marginBottom: index == listReply.length - 1 ? 20 : 0 }]}>
                      {/* <Text style={{ marginLeft: "7%", color: "#1c162e" }}>{item.content}</Text> */}
                      <AutoHeightWebView
                        style={{ width: '100%' }}
                        customScript={`document.body.style.background = 'transparent';`}
                        customStyle={`
                        * {
                          font-family: 'Times New Roman';
                        }
                        p {
                          font-size: 20px;
                          width= 30px;
                        }
                      `}
                        onSizeUpdated={size => { console.log(size.height) }}
                        files={[{
                          href: 'cssfileaddress',
                          type: 'text/css',
                          rel: 'stylesheet'
                        }]}
                        source={{ html: `<p style="font-weight: 400;font-style: normal;font-size: 21px;line-height: 1.58;letter-spacing: -.003em; width: 10px;">${item.content}</p>` }}
                        scalesPageToFit={true}
                        zoomable={false}
                        // textZoom={250}
                      />
                    </View>
                  </View>
                )
            }
          />
        </View>
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
  clock1: {
    height: normalize(12),
    width: normalize(12),
    marginLeft: 5,
    alignSelf: "center",
    marginRight: "7%"
  },
  clock2: {
    height: normalize(12),
    width: normalize(12),
    marginLeft: 5,
    alignSelf: "center",
    marginRight: "10%"
  },
  titleComment1: {
    fontSize: normalize(12),
    marginLeft: "10%",
    alignSelf: "center"
  },
  titleComment2: {
    fontSize: normalize(12),
    marginLeft: "7%",
    alignSelf: "center"
  },
  bgComment1: {
    backgroundColor: "#243b4a74",
    marginLeft: "7%",
    paddingHorizontal: "3%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginTop: 5,
    paddingVertical: 10
  },
  bgComment2: {
    backgroundColor: "white",
    marginRight: "7%",
    padding: "3%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 5,
    paddingVertical: 10
  },
  textReply: {
    fontSize: normalize(13),
    marginLeft: "7%",
    fontWeight: "bold",
    marginTop: 5
  },
  btnReply: {
    backgroundColor: "#ff3b3b",
    height: normalize(25),
    width: normalize(60),
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnEndTask: {
    backgroundColor: "#1c162e",
    height: normalize(25),
    width: normalize(60)
  },
  containerBtn: {
    height: normalize(60),
    width: normalize(60),
    position: "absolute",
    right: "7%",
    bottom: -30,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end"
  },
  imgBgMsg: {
    height: normalize(70),
    width: normalize(70),
    position: "absolute",
    left: "7%",
    bottom: 15
  }
});