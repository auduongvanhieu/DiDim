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
import { CheckBox, Button } from 'react-native-elements';

import { normalize } from "../../utilities/ThemeUtils";
import { AppColors, AppConstant } from "../../utilities/Constants";
import StatusButton from "../CustomView/StatusButton";
import HeaderMenu from "../CustomView/HeaderMenu";
import { Images } from "../../assets";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from "react-native-modal";
import SearchBox from "../CustomView/SearchBox";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const aspecRatio = screenHeight / screenWidth;

const listAccountNumber = [
  { id: 0, accountNumber: "000000", accountName: "관리자", added: true },
  { id: 1, accountNumber: "000001", accountName: "서비스 관리", added: true  },
  { id: 2, accountNumber: "000002", accountName: "닷넷피아", added: false  },
  { id: 3, accountNumber: "000003", accountName: "홍길동", added: false  },
  { id: 4, accountNumber: "000004", accountName: "영업부", added: false  },
  { id: 5, accountNumber: "000005", accountName: "운영센터", added: false  },
  { id: 6, accountNumber: "000006", accountName: "운영센터2", added: false  },
  { id: 7, accountNumber: "000007", accountName: "운영센터3", added: false  },
  { id: 8, accountNumber: "000008", accountName: "운영센터4", added: false  },
  { id: 9, accountNumber: "000009", accountName: "운영센터5", added: false  },
]

export default class SupportWriteComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      email: "",
      mobile: "",
      title: "",
      contact: "",
      refreshModal: false,
      isModalVisible: false,
      textModelSearch: "",
      listAccountNumberHorizontal: [],
      listAccountNumberModal: [],
    };
  }

  componentDidMount(){
    for (let index = 0 ; index < listAccountNumber.length; index++) {
      this.state.listAccountNumberHorizontal.push(listAccountNumber[index]);
    }
    for (let index = 0 ; index < listAccountNumber.length; index++) {
      this.state.listAccountNumberModal.push(listAccountNumber[index]);
    }
    this.setState({})
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(AppColors.headerBg2);
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  /**
   * Render views
   */
  render() {
    const {navigateToSupportCenterScreen} = this.props;
    return (
      <Container>
        <StatusBar backgroundColor={AppColors.headerBg2} />
        <HeaderMenu backAction={()=>navigateToSupportCenterScreen()} title={"Support Center"} />
        <View style={styles.containerHorizontal}>
          <View style={styles.containerLeft}>
            <Text style={styles.textLeft}>Type of Inquiry</Text>
          </View>
          <View style={styles.containerPicker}>
            <Picker
              mode="dropdown"
              selectedValue={this.state.typeOfInquiry}
              style={{ height: "100%", width: "100%" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ typeOfInquiry: itemValue })
              }
            >
              <Picker.Item label="기술지원" value="기술지원" />
              <Picker.Item label="기술지원2" value="기술지원2" />
              <Picker.Item label="기술지원3" value="기술지원3" />
            </Picker>
          </View>
          <CheckBox
            center
            title="긴급"
            checkedColor="red"
            checkedIcon="check-circle"
            uncheckedIcon="circle-o"
            checked={this.state.checked}
            onPress={() => this.setState({ checked: !this.state.checked })}
            containerStyle={{
              borderWidth: 0,
              backgroundColor: "transparent",
              marginLeft: 10,
              padding: 0
            }}
          />
        </View>
        <View style={styles.horizontalBar} />
        <View style={styles.containerHorizontal}>
          <View style={styles.containerLeft}>
            <Text style={styles.textLeft}>Account Number</Text>
          </View>
          <ScrollView horizontal={true}>
            {this.state.listAccountNumberHorizontal.map(item => {
              return item.added == true ? (
                <View style={styles.containerAccountNumber}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: normalize(12),
                      marginRight: 5
                    }}
                  >
                    {item.accountNumber}
                  </Text>
                  <Ionicons size={15} name="md-close" color="white" />
                </View>
              ) : null;
            })}
          </ScrollView>
          <Ionicons
            onPress={() => {
              // for (let index = 0 ; index < listAccountNumber.length; index++) {
              //   this.state.listAccountNumberModal.push(listAccountNumber[index]);
              // }
              this.toggleModal()
            }}
            size={25}
            name="md-add-circle"
            color="blue"
            style={{ marginLeft: 5 }}
          />
        </View>
        <View style={styles.horizontalBar} />
        <View style={styles.containerHorizontal}>
          <View style={styles.containerLeft}>
            <Text style={styles.textLeft}>e-Mail</Text>
          </View>
          <TextInput
            placeholder="Input Mail"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            style={styles.textRight}
            multiline={true}
          />
        </View>
        <View style={styles.horizontalBar} />
        <View style={styles.containerHorizontal}>
          <View style={styles.containerLeft}>
            <Text style={styles.textLeft}>Mobile</Text>
          </View>
          <TextInput
            placeholder="Input Mobile Number"
            onChangeText={mobile => this.setState({ mobile })}
            value={this.state.mobile}
            style={styles.textRight}
          />
        </View>
        <View style={styles.horizontalBar} />
        <View style={styles.containerHorizontal}>
          <View style={styles.containerLeft}>
            <Text style={styles.textLeft}>Title</Text>
          </View>
          <TextInput
            placeholder="제목을 입력해 주세요."
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            style={styles.textRight}
          />
        </View>
        <View style={styles.horizontalBar} />
        <View style={{ height: normalize(150) }}>
          <TextInput
            placeholder="문의 내용을 입력해 주세요."
            onChangeText={contact => this.setState({ contact })}
            value={this.state.contact}
            style={[
              styles.textRight,
              { marginLeft: "6.7%", textAlign: "left" }
            ]}
          />
        </View>
        <View style={styles.horizontalBar} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30
          }}
        >
          <Button
            title="취 소"
            buttonStyle={[styles.buttonBottom, { backgroundColor: "#666372" }]}
          />
          <Button
            title="등 록"
            buttonStyle={[styles.buttonBottom, { backgroundColor: "#ff3b3b" }]}
          />
        </View>
        <Modal
          style={{ margin: 0 }}
          animationIn="bounceInUp"
          animationOut="bounceOutDown"
          isVisible={this.state.isModalVisible}
        >
          <View style={{ flex: 1, padding: 0 }}>
            <View style={{ flex: 1 }} />
            <View style={styles.containerModel}>
              <View style={styles.containerTopModal}>
                <Text style={{ fontSize: normalize(18), color: "#140f26" }}>
                  계정 선택
                </Text>
                <View style={{ flex: 1 }} />
                <Ionicons
                  size={25}
                  onPress={() => this.toggleModal()}
                  name="md-close"
                  color="#140f26"
                  style={styles.buttonCloseModel}
                />
              </View>
              <Text
                style={{
                  marginLeft: "7%",
                  color: "#98a2ad",
                  fontSize: normalize(12)
                }}
              >
                계정번호, 회원명, 아이디로 검색이 가능합니다.
              </Text>
              <View
                style={{
                  marginTop: normalize(20),
                  backgroundColor: "#f4f6f9",
                  height: normalize(10),
                  width: "100%"
                }}
              />
              <View style={{ marginLeft: "5%" }}>
                <SearchBox 
                  onChangeText={(textModelSearch) => {
                    this.setState({textModelSearch},()=>{
                      this.state.listAccountNumberModal = listAccountNumber.filter(
                        item => item.accountNumber.includes(this.state.textModelSearch) ||
                        item.accountName.includes(this.state.textModelSearch)
                      )
                      this.setState({
                        refreshModal: !this.state.refreshModal
                      })
                    })
                  }}
                  value={this.state.textModelSearch}
                  title="Account Search" />
              </View>
              <View style={styles.horizontalBar} />
              <View style={{ height: screenHeight / 3 }}>
                <FlatList
                  data={this.state.listAccountNumberModal}
                  keyExtractor={item => item.index}
                  extraData={this.state.refreshModal}
                  ItemSeparatorComponent={() => (
                    <View style={styles.horizontalBar2} />
                  )}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "flex-start",
                        marginLeft: "5%",
                        paddingVertical: 5
                      }}
                    >
                      <CheckBox
                        center
                        title={
                          "    " + `[${item.accountNumber}] ` + item.accountName
                        }
                        checkedColor="red"
                        checkedIcon="check-circle"
                        uncheckedIcon="circle-o"
                        checked={item.added}
                        onPress={() => {
                          this.state.listAccountNumberModal[index].added = !this
                            .state.listAccountNumberModal[index].added;
                          listAccountNumber[index].added = this
                            .state.listAccountNumberModal[index].added;
                          this.setState({
                            refreshModal: !this.state.refreshModal
                          });
                        }}
                        containerStyle={{
                          borderWidth: 0,
                          backgroundColor: "transparent",
                          padding: 0,
                          alignSelf: "flex-start"
                        }}
                      />
                    </View>
                  )}
                />
              </View>
              <Button
                onPress={() => {
                  this.state.listAccountNumberHorizontal = []
                  for (let index = 0 ; index < listAccountNumber.length; index++) {
                    this.state.listAccountNumberHorizontal.push(listAccountNumber[index]);
                  }
                  this.toggleModal();
                }}
                title="적 용"
                buttonStyle={[
                  styles.buttonBottom,
                  { backgroundColor: "#ff3b3b", alignSelf: "center" }
                ]}
              />
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  containerHorizontal: {
    flexDirection: "row",
    paddingHorizontal: "6.7%",
    alignItems: "center",
    height: normalize(60)
  },
  containerLeft: {
    width: "20%",
    marginRight: 20
  },
  textLeft: {
    fontSize: AppConstant.textMainSize
  },
  containerPicker: {
    height: normalize(30),
    width: normalize(120),
    backgroundColor: "#f2f2f4",
    borderRadius: 10
  },
  containerAccountNumber: {
    backgroundColor: "#5c5968",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10
  },
  horizontalBar: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#6c7b8a"
  },
  horizontalBar2: {
    opacity: 0.1,
    height: 1,
    width: "100%",
    backgroundColor: "#6c7b8a"
  },
  textRight: { fontSize: normalize(15) },
  buttonBottom: {
    height: normalize(30),
    width: normalize(70),
    marginLeft: 10,
    borderRadius: 10
  },
  buttonCloseModel: {
    marginRight: 10,
    top: 0
  },
  containerTopModal: { flexDirection: "row", marginLeft: "7%", marginTop: 10 },
  containerModel: {
    margin: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
});