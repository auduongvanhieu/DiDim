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
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ModalDropdown from 'react-native-modal-dropdown';

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
      requestTypeIndex: 0
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
    const {asRequestTypeListRequest} = this.props
    asRequestTypeListRequest({Par: "cmd=GET_LIST_AS_REQUEST_TYPE"})
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

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
          {option.name}
        </Text>
      </View>
    );
  }

  /**
   * Render views
   */
  render() {
    const {navigateToSupportCenterScreen, asRequestTypeListData} = this.props;
    const {requestTypeIndex} = this.state;
    return (
      <Container>
      {/* {asRequestTypeListData && console.log("__haha__", JSON.stringify(asRequestTypeListData))} */}
        <StatusBar backgroundColor={AppColors.headerBg2} />
        <HeaderMenu backAction={()=>navigateToSupportCenterScreen()} title={"Support Center"} />
        <View style={styles.containerHorizontal} >
          <View style={styles.containerLeft}>
            <Text style={styles.textLeft}>Type of Inquiry</Text>
          </View>
          <View style={styles.containerPicker} >
            { asRequestTypeListData &&
            <ModalDropdown 
              options={asRequestTypeListData}
              style={styles.dropdown}
              dropdownStyle={{height: normalize(170), marginTop: 10}}
              defaultValue={asRequestTypeListData[requestTypeIndex].name}
              defaultIndex={requestTypeIndex}
              onSelect={(index)=> this.setState({ requestTypeIndex: index })}
              textStyle={{fontSize: normalize(13), color: '#3b3b4d', fontWeight: 'bold'}}
              renderRow={this._dropdown_renderRow}
              showsVerticalScrollIndicator={false}
              renderButtonText={rowData => <Text>{rowData.name}</Text>}
            />
            }
            <View style={{flex: 1}} />
            <MaterialIcons size={20} name='unfold-more' />
          </View>
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
            multiline={true}
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
    width: normalize(100),
    backgroundColor: "#f2f2f4",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center"
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
  },
  dropdown: {
    justifyContent: "center",
    left: 10,
    width: normalize(100),
    height: "100%",
    position: "absolute",
    backgroundColor: "transparent"
  }
});