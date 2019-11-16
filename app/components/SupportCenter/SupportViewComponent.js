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
} from "react-native";
import { Button } from 'react-native-elements';

import { normalize } from "../../utilities/ThemeUtils";
import { AppColors, AppConstant } from "../../utilities/Constants";
import StatusButton from "../CustomView/StatusButton";
import HeaderMenu from "../CustomView/HeaderMenu";
import { Images } from "../../assets";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const aspecRatio = screenHeight / screenWidth;

const commentData = [
  {comment: `안녕하세요!
시스템통합운영센터 서비스데스크입니다.

당일 18시에 아파치 설정 변경 후 재안내 드리겠으며,
작업 시작 전/후로 고객님 번호로 연락드리도록 하겠습니다.

감사합니다.
  `},
  {comment: `안녕하세요!
파슨텍 서버 담당자 OOO 입니다.

WAS accesslog 접속 및 저장이 안되고 있습니다.
해당 증상 확인 부탁드립니다.
  `},
  {comment: `this is test 1`},
  {comment: `this is test 2`},
  {comment: `this is test 3`},
]

export default class SupportViewComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state={
      hour: "",
      comment: ""
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

  onPressReply = () => {
    const {
      commentRegistrationRequest,
      navData,
    } = this.props;
    const { comment } = this.props;
    commentRegistrationRequest({Par: `cmd=UPDATE_AS_REQUEST_REPLY&board_idx=${navData.board_idx}&qna_kind=AddComment&write_content=${comment}`});
    this.setState({comment: ""})
  }

  onPressEndTask = () => {
    const {
      commentRegistrationRequest,
      navData,
    } = this.props;
    const { comment } = this.props;
    commentRegistrationRequest({Par: `cmd=UPDATE_AS_REQUEST_REPLY&board_idx=${navData.board_idx}&qna_kind=Close&write_content=${comment}`});
    this.setState({comment: ""})
  }

  /**
   * Render views
   */
  render() {
    const {
      navigateToSupportCenterScreen,
      asRequestDetailData,
      commentRegistrationRequest,
      commentRegistrationData,
    } = this.props;
    return (
      <Container>
        {/* {asRequestDetailData && console.log("__haha__",JSON.stringify(asRequestDetailData))} */}
        {/* {commentRegistrationData && console.log("__haha__",JSON.stringify(commentRegistrationData))} */}
        <StatusBar backgroundColor={AppColors.headerBg2} />
        <HeaderMenu
          backAction={() => navigateToSupportCenterScreen()}
          title={"Support Center"}
        />
        <View style={{ paddingVertical: "4%", paddingHorizontal: "7%" }}>
          <Text style={{ fontSize: normalize(18), color: "#140f26" }}>
            {asRequestDetailData && asRequestDetailData.content.title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: normalize(50), flexDirection: "row" }}>
              <StatusButton title={"접 수"} bgColor="blue" />
            </View>
            <Image
              source={Images.ico_clock_b}
              style={{ height: normalize(13), width: normalize(13), marginLeft: 10, alignSelf: "center" }}
            />
            <Text style={{ fontSize: normalize(12), alignSelf: "center" }}>
              {" "}
              {asRequestDetailData && asRequestDetailData.content.writeday}
            </Text>
            <Image
              source={Images.ico_tag}
              style={{ height: normalize(13), width: normalize(13), marginLeft: 10, alignSelf: "center" }}
            />
            <Text style={{ fontSize: normalize(12), alignSelf: "center" }}>
              {" "}
              기술지원
            </Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: "#f4f6f9", height: "2.5%", width: "100%" }}
        />
        <View style={{ height: screenHeight / 4.5, backgroundColor: "white" }}>
          <TextInput
            placeholder="문의사항 또는 댓글을 입력해 주세요."
            style={{ fontSize: normalize(13), paddingHorizontal: "7%"}}
            value={this.state.comment}
            onChangeText={comment => this.setState({ comment })}
            multiline={true}
          />
          <Image source={Images.bg_ico_msg} style={styles.imgBgMsg} />
          <View style={styles.containerBtn}>
            <Button 
              title="작업종료" 
              onPress={this.onPressEndTask}
              buttonStyle={styles.btnEndTask} />
            <Button
              title="Reply"
              onPress={this.onPressReply}
              buttonStyle={styles.btnReply}
            />
          </View>
        </View>
        <View style={{ backgroundColor: "#f4f6f9", flex: 1 }}>
          <Text style={styles.textReply}>Reply</Text>
          <FlatList
            data={commentData}
            renderItem={({ item, index }) =>
              index % 2 == 0 ? (
                <View>
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Text style={styles.titleComment1}>고객지원</Text>
                    <View style={{ flex: 1 }} />
                    <Text
                      style={{ fontSize: normalize(10), alignSelf: "center" }}
                    >
                      2019-07-04 13:10
                    </Text>
                    <Image source={Images.ico_clock_b} style={styles.clock1} />
                  </View>
                  <View style={styles.bgComment1}>
                    <Text style={{ color: "white" }}>{item.comment}</Text>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Text style={styles.titleComment2}>
                      (주)파슨텍(창조경제혁신센터)
                    </Text>
                    <View style={{ flex: 1 }} />
                    <Text
                      style={{ fontSize: normalize(10), alignSelf: "center" }}
                    >
                      2019-07-04 13:10
                    </Text>
                    <Image source={Images.ico_clock_b} style={styles.clock2} />
                  </View>
                  <View style={styles.bgComment2}>
                    <Text style={{ marginLeft: "7%", color: "#1c162e" }}>
                      {item.comment}
                    </Text>
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
    padding: "3%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginTop: 5
  },
  bgComment2: {
    backgroundColor: "white",
    marginRight: "7%",
    padding: "3%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 5
  },
  textReply: {
    fontSize: normalize(13),
    marginLeft: "7%",
    fontWeight: "bold",
    marginTop: 5
  }, 
  btnReply: {
    backgroundColor: "#ff3b3b",
    height: normalize(30),
    width: normalize(70),
    marginLeft: 10
  }, 
  btnEndTask: {
    backgroundColor: "#1c162e",
    height: normalize(30),
    width: normalize(70)
  }, 
  containerBtn: {
    height: normalize(60),
    width: normalize(60),
    position: "absolute",
    right: "7%",
    bottom: -20,
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