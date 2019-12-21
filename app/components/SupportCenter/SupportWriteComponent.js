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
      isDisplayAccountNumber: true
    };
  }

  componentDidMount(){
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
      const {asRequestTypeListRequest, guestNoListRequest} = this.props;
      asRequestTypeListRequest({Par: "cmd=GET_LIST_AS_REQUEST_TYPE"});
      guestNoListRequest({Par: "cmd=GET_LIST_GUEST_NO"});
    });

    const {asRequestTypeListRequest, guestNoListRequest} = this.props;
    asRequestTypeListRequest({Par: "cmd=GET_LIST_AS_REQUEST_TYPE"});
    guestNoListRequest({Par: "cmd=GET_LIST_GUEST_NO"});
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.guestNoListData && nextProps.guestNoListDa!=this.props.guestNoListData){
      this.state.listAccountNumberHorizontal = []
      this.state.listAccountNumberModal = []
      var listAccountNumberTemp = nextProps.guestNoListData;
      for (let index = 0 ; index < listAccountNumberTemp.length; index++) {
        listAccountNumberTemp[index].id = index;
        listAccountNumberTemp[index].added = false;

        listAccountNumber.push(listAccountNumberTemp[index]);
        this.state.listAccountNumberHorizontal.push(listAccountNumberTemp[index]);
        this.state.listAccountNumberModal.push(listAccountNumberTemp[index]);
      }
    }
    if(nextProps.asRequestRegistrationData && nextProps.asRequestRegistrationData!=this.props.asRequestRegistrationData){
      const {asRequestListRequest, navigateToSupportCenterScreen} = this.props;
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
              asRequestListRequest({Par: 'cmd=GET_LIST_AS_REQUEST'})
              navigateToSupportCenterScreen();
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onPressRegistration = () =>{
    const {asRequestRegistrationRequest, asRequestTypeListData} = this.props;
    const { email, mobile, title, contact, requestTypeIndex, isDisplayAccountNumber} = this.state;
    var refGuestNo = "";
    this.state.listAccountNumberHorizontal.forEach(element => {
      if(element.added && element.geust_no){
        if(refGuestNo == "")
          refGuestNo = refGuestNo + element.geust_no
        else
          refGuestNo = refGuestNo +","+ element.geust_no
      }
    });
    if(isDisplayAccountNumber)
      asRequestRegistrationRequest({Par: `cmd=ADD_AS_REQUEST&cate_idx=${asRequestTypeListData[requestTypeIndex].idx}&title=${title}&content=${contact}&email=${email}&write_htel=${mobile}&refGuestNo=${refGuestNo}`})
    else
      asRequestRegistrationRequest({Par: `cmd=ADD_AS_REQUEST&cate_idx=${asRequestTypeListData[requestTypeIndex].idx}&title=${title}&content=${contact}&email=${email}&write_htel=${mobile}`})
  }

  onPressCancel = () =>{
    this.setState({
      email: "",
      mobile: "",
      title: "",
      contact: "",
    });
    this.props.navigateToSupportCenterScreen();
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
          {option.name}
        </Text>
      </View>
    );
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
    const {requestTypeIndex, isDisplayAccountNumber} = this.state;
    return (
      <KeyboardAvoidingView>
      {/* {asRequestTypeListData && console.log("__haha__", JSON.stringify(asRequestTypeListData))} */}
      {/* {guestNoListData && console.log("__haha__", JSON.stringify(guestNoListData))} */}
        <StatusBar backgroundColor={AppColors.headerBg2} />
        <HeaderMenu backAction={()=>navigateToSupportCenterScreen()} title={I18n.t('supportCenter')} />
        <ScrollView>
        <View style={styles.containerHorizontal} >
          <View style={styles.containerLeft}>
          <Text style={styles.textLeft}>{I18n.t('typeOfInquiry')}</Text>
          </View>
          <View style={styles.containerPicker} >
            { (asRequestTypeListData && this.state.requestTypeIndex >= 0) &&
            <ModalDropdown 
              options={asRequestTypeListData}
              style={styles.dropdown}
              dropdownStyle={{height: normalize(170), marginTop: 10}}
              defaultValue={asRequestTypeListData[this.state.requestTypeIndex].name}
              defaultIndex={this.state.requestTypeIndex}
              onSelect={(index)=> this.setState({ requestTypeIndex: index, 
                        isDisplayAccountNumber:  asRequestTypeListData[index].idx == 5 
                        || asRequestTypeListData[index].idx == 6 ? true : false})}
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
        {
          isDisplayAccountNumber &&
          <View style={styles.containerHorizontal}>
            <View style={styles.containerLeft}>
              <Text style={styles.textLeft}>{I18n.t('accountNumber')}</Text>
            </View>
            <ScrollView horizontal={true}>
              {this.state.listAccountNumberHorizontal.map((item, index) => {
                return item.added == true ? (
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
                      onPress={()=>{
                        item.added = false;
                        this.setState({})
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
            keyboardType={"numeric"}
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
            marginTop: 30
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
                  keyboardType='numeric'
                  onChangeText={(textModelSearch) => {
                    this.setState({textModelSearch},()=>{
                      this.state.listAccountNumberModal = listAccountNumber.filter(
                        item => item.geust_no.includes(this.state.textModelSearch) ||
                        item.name.includes(this.state.textModelSearch)
                      )
                      this.setState({
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
                title={I18n.t('modalWriteSupportSubmit')}
                buttonStyle={[
                  styles.buttonBottom,
                  { backgroundColor: "#ff3b3b", alignSelf: "center" }
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