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
  KeyboardAvoidingView,
  Alert,
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

const listAccountNumber = []
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
      requestTypeIndex: 0,
      isDisplayAccountNumber: true,
      choosedIndex: [],
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(AppColors.headerBg2);
      this.setState({
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
      })
      const { asRequestTypeListRequest, guestNoListRequest } = this.props;
      asRequestTypeListRequest({ Par: "cmd=GET_LIST_AS_REQUEST_TYPE" });
      guestNoListRequest({ Par: "cmd=GET_LIST_GUEST_NO" });
    });

    const { asRequestTypeListRequest, guestNoListRequest } = this.props;
    asRequestTypeListRequest({ Par: "cmd=GET_LIST_AS_REQUEST_TYPE" });
    guestNoListRequest({ Par: "cmd=GET_LIST_GUEST_NO" });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.guestNoListData && nextProps.guestNoListDa != this.props.guestNoListData) {
      this.state.listAccountNumberHorizontal = []
      this.state.listAccountNumberModal = []
      var listAccountNumberTemp = nextProps.guestNoListData;
      //remove all list account number
      listAccountNumber.splice(0, listAccountNumber.length);
      for (let index = 0; index < listAccountNumberTemp.length; index++) {
        listAccountNumberTemp[index].id = index;
        listAccountNumber.push(listAccountNumberTemp[index]);
        this.state.listAccountNumberHorizontal.push(listAccountNumberTemp[index]);
        this.state.listAccountNumberModal.push(listAccountNumberTemp[index]);
      }
    }
    if (nextProps.asRequestRegistrationData && nextProps.asRequestRegistrationData != this.props.asRequestRegistrationData) {
      const { asRequestListRequest, navigateToSupportCenterScreen } = this.props;
      Alert.alert(
        "Notification",
        "Request is performed",
        [
          {
            text: "Confirm",
            style: "destructive",
            onPress: () => {
              this.setState({
                email: "",
                mobile: "",
                title: "",
                contact: "",
              });
              asRequestListRequest({ Par: 'cmd=GET_LIST_AS_REQUEST' })
              navigateToSupportCenterScreen();
            }
          }
        ],
        { cancelable: false }
      );
    }
    if (nextProps.asRequestRegistrationInit && nextProps.asRequestRegistrationInit != this.props.asRequestRegistrationInit) {
      this.setState({
        email: "",
        mobile: "",
        title: "",
        contact: "",
        isDisplayAccountNumber: true
      }, () => {
        this.modalDropdown.select(0)
      });
    }
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onPressRegistration = () => {
    const { asRequestRegistrationRequest, asRequestTypeListData, showErrorAlert } = this.props;
    const { email, mobile, title, contact, requestTypeIndex, isDisplayAccountNumber, choosedIndex } = this.state;

    if (!this.isEmail(email)) {
      showErrorAlert({ title: I18n.t('failure'), description: I18n.t('errorEmail') });
      return;
    }
    if (mobile == "") {
      showErrorAlert({ title: I18n.t('failure'), description: I18n.t('phoneEmpty') });
      return;
    }
    if (!this.isNumberPhone(mobile)) {
      showErrorAlert({ title: I18n.t('failure'), description: I18n.t('errorPhone') });
      return;
    }
    if (title == "") {
      showErrorAlert({ title: I18n.t('failure'), description: I18n.t('titleEmpty') });
      return;
    }
    if (contact == "") {
      showErrorAlert({ title: I18n.t('failure'), description: I18n.t('questionEmpty') });
      return;
    }

    var refGuestNo = "";
    this.state.listAccountNumberHorizontal.map((element,index) => {
      if (choosedIndex.includes(element.geust_no) && element.geust_no) {
        if (refGuestNo == "")
          refGuestNo = refGuestNo + element.geust_no
        else
          refGuestNo = refGuestNo + "," + element.geust_no
      }
    });
    // alert(refGuestNo)
    if (isDisplayAccountNumber)
      asRequestRegistrationRequest({ Par: `cmd=ADD_AS_REQUEST&cate_idx=${asRequestTypeListData[requestTypeIndex].idx}&title=${title}&content=${contact}&email=${email}&write_htel=${mobile}&refGuestNo=${refGuestNo}` })
    else
      asRequestRegistrationRequest({ Par: `cmd=ADD_AS_REQUEST&cate_idx=${asRequestTypeListData[requestTypeIndex].idx}&title=${title}&content=${contact}&email=${email}&write_htel=${mobile}` })
  }

  onPressCancel = () => {
    this.setState({
      email: "",
      mobile: "",
      title: "",
      contact: "",
      isDisplayAccountNumber: true
    }, () => {
      this.modalDropdown.select(0)
      this.props.navigateToSupportCenterScreen();
    });

  }

  _dropdown_renderRow = (option, index, isSelected) => {
    return (
      <View
        style={{
          width: normalize(160),
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
          {I18n.t(`${option.name}`)}
        </Text>
      </View>
    );
  }

  isEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(text);
  }

  isNumberPhone = (phone) => {
    let reg = /^[0-9]{3}[-]?[0-9]{3,4}[-]?[0-9]{4}$/
    if (reg.test(phone)) {
      return true;
    }
    return false;
  }
  /**
   * Render views
   */
  render() {
    const {
      navigateToSupportCenterScreen,
      asRequestTypeListData,
      guestNoListData
    } = this.props;
    const { requestTypeIndex, isDisplayAccountNumber, choosedIndex } = this.state;
    return (
      <KeyboardAvoidingView>
        {/* {asRequestTypeListData && console.log("__haha__", JSON.stringify(asRequestTypeListData))} */}
        {/* {guestNoListData && console.log("__haha__", JSON.stringify(guestNoListData))} */}
        <StatusBar backgroundColor={AppColors.headerBg2} />
        <HeaderMenu backAction={() => this.onPressCancel()} title={I18n.t('supportCenter')} />
        <ScrollView>
          <View style={styles.containerHorizontal} >
            <View style={styles.containerLeft}>
              <Text style={styles.textLeft}>{I18n.t('typeOfInquiry')}</Text>
            </View>
            <View style={styles.containerPicker} >
              {(asRequestTypeListData && this.state.requestTypeIndex >= 0) &&
                <ModalDropdown
                  ref={modalDropdown => this.modalDropdown = modalDropdown}
                  options={asRequestTypeListData}
                  style={styles.dropdown}
                  dropdownStyle={{ height: normalize(170), marginTop: 10 }}
                  defaultValue={I18n.t(`${asRequestTypeListData[this.state.requestTypeIndex].name}`)}
                  defaultIndex={this.state.requestTypeIndex}
                  onSelect={(index) => this.setState({
                    requestTypeIndex: index,
                    isDisplayAccountNumber: asRequestTypeListData[index].idx == 5
                      || asRequestTypeListData[index].idx == 6 ? true : false
                  })}
                  textStyle={{ fontSize: normalize(13), color: '#3b3b4d', fontWeight: 'bold' }}
                  renderRow={this._dropdown_renderRow}
                  showsVerticalScrollIndicator={false}
                  renderButtonText={rowData => <Text>{I18n.t(`${rowData.name}`)}</Text>}
                />
              }
              <View style={{ flex: 1 }} />
              <MaterialIcons size={20} name='unfold-more' />
            </View>
          </View>
          <View style={styles.horizontalBar} />
          {
            isDisplayAccountNumber &&
            <View style={styles.containerHorizontal}>
              <View style={styles.containerLeft}>
                <Text style={styles.textLeft}>{I18n.t('accountNumber')}</Text>
              </View>
              <ScrollView horizontal={true}>
                {this.state.listAccountNumberHorizontal.map((item, index) => {
                  return choosedIndex.includes(item.geust_no) ? (
                    <View style={styles.containerAccountNumber}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: normalize(12),
                          marginRight: 5
                        }}
                      >
                        {item.geust_no}
                      </Text>
                      <Ionicons
                        onPress={() => {
                        }}
                        size={15} name="md-close" color="white" />
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
          }
          <View style={styles.horizontalBar} />
          <View style={styles.containerHorizontal}>
            <View style={styles.containerLeft}>
              <Text style={styles.textLeft}>{I18n.t('email')}</Text>
            </View>
            <TextInput
              ref={(input) => { this.firstTextInput = input; }}
              placeholder={I18n.t('emailHint')}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              style={styles.textRight}
              returnKeyType={"next"}
              keyboardType="email-address"
              onSubmitEditing={() => { this.secondTextInput.focus(); }}
            />
          </View>
          <View style={styles.horizontalBar} />
          <View style={styles.containerHorizontal}>
            <View style={styles.containerLeft}>
              <Text style={styles.textLeft}>{I18n.t('mobile')}</Text>
            </View>
            <TextInput
              ref={(input) => { this.secondTextInput = input; }}
              placeholder={I18n.t('inputMobileNumber')}
              onChangeText={mobile => this.setState({ mobile })}
              value={this.state.mobile}
              style={styles.textRight}
              returnKeyType={"next"}
              keyboardType={"phone-pad"}
              onSubmitEditing={() => { this.thirdTextInput.focus(); }}
            />
          </View>
          <View style={styles.horizontalBar} />
          <View style={styles.containerHorizontal}>
            <View style={styles.containerLeft}>
              <Text style={styles.textLeft}>{I18n.t('title')}</Text>
            </View>
            <TextInput
              ref={(input) => { this.thirdTextInput = input; }}
              placeholder={I18n.t('titleHint')}
              onChangeText={title => this.setState({ title })}
              maxLength={100}
              value={this.state.title}
              style={styles.textRight}
              returnKeyType={"next"}
              onSubmitEditing={() => { this.fourTextInput.focus(); }}
            />
          </View>
          <View style={styles.horizontalBar} />
          <View style={{ height: normalize(150) }}>
            <TextInput
              ref={(input) => { this.fourTextInput = input; }}
              placeholder={I18n.t('writeCommentHint')}
              onChangeText={contact => this.setState({ contact })}
              value={this.state.contact}
              style={[
                styles.textRight,
                { marginLeft: "6.7%", textAlign: "left" }
              ]}
              multiline={true}
              returnKeyType={"done"}
            />
          </View>
          <View style={styles.horizontalBar} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: normalize(6),
            }}
          >
            <Button
              title={I18n.t('cancel')}
              buttonStyle={[styles.buttonBottom, { backgroundColor: "#666372" }]}
              onPress={this.onPressCancel}
            />
            <Button
              title={I18n.t('submit')}
              buttonStyle={[styles.buttonBottom, { backgroundColor: "#ff3b3b" }]}
              onPress={this.onPressRegistration}
            />
          </View>
        </ScrollView>
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
                  {I18n.t('modalWriteSupportTitle')}
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
                {I18n.t('modalWriteSupportSubtitle')}
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
                  keyboardType='default'
                  onChangeText={(textModelSearch) => {
                    this.setState({ textModelSearch }, () => {
                      this.setState({
                        listAccountNumberModal: listAccountNumber.filter(
                          item => `${item.geust_no}`.toLowerCase().includes(`${this.state.textModelSearch}`.toLowerCase()) ||
                            `${item.name}`.toLowerCase().includes(`${this.state.textModelSearch}`.toLowerCase())
                        ),
                        refreshModal: !this.state.refreshModal
                      })
                    })
                  }}
                  value={this.state.textModelSearch}
                  title={I18n.t('accountSearch')} />
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
                          "    " + `[${item.geust_no}] ` + item.name
                        }
                        checkedColor="red"
                        checkedIcon="check-circle"
                        uncheckedIcon="circle-o"
                        checked={choosedIndex.includes(item.geust_no)}
                        onPress={() => {
                          const { choosedIndex } = this.state;
                          if (!choosedIndex.includes(item.geust_no)) {
                            choosedIndex.push(item.geust_no);
                          }
                          else {
                            if(choosedIndex.indexOf(item.geust_no) >= 0)
                            choosedIndex.splice(choosedIndex.indexOf(item.geust_no), 1);
                          }
                          this.setState({
                            choosedIndex
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
                  this.toggleModal();
                }}
                title={I18n.t('modalWriteSupportSubmit')}
                buttonStyle={[
                  styles.buttonBottom,
                  { backgroundColor: "#ff3b3b", alignSelf: "center", marginBottom: normalize(12) }
                ]}
              />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
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
    width: normalize(160),
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
    height: 1,
    width: "100%",
    backgroundColor: "#6c7b8a",
    opacity: 0.1
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
    width: normalize(150),
    height: "100%",
    position: "absolute",
    backgroundColor: "transparent"
  }
});