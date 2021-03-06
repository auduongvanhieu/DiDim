import React, { Component } from "react";
import I18n from "../../I18n";
import { 
  Container, Button, 
} from "native-base";
import {
  View,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Picker,
  StyleSheet,
  ScrollView
} from "react-native";
import { normalize } from "../../utilities/ThemeUtils";
import HeaderMenuHome from "../CustomView/HeaderMenuHome";
import SearchBox from "../CustomView/SearchBox";
import { AppColors, AppConstant } from "../../utilities/Constants";
import StatusButton from "../CustomView/StatusButton";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import moment from "moment";
import { Images } from "../../assets";
import ModalDropdown from 'react-native-modal-dropdown';
import NoDataView from "../CustomView/NoDataView";
import { SuperObjects } from "../../utilities/Config";
import { generateStatusColor, generateImageOS, generateServerIcon } from "../../utilities/Helper";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const sorts = [
  { title: "IP", value: "I" },
  { title: "Status", value: "S" },
  { title: "Server Name", value: "N" },
];
export default class StatusInfoComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state={
      sortIndex: 0,
      searchText: '',
      status: 'A',
      isRefreshing: false
    }
  }

  componentDidMount(){
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(AppColors.headerBg);

      const {serverListRequest} = this.props;
      // startLoading()
      serverListRequest({Par: `cmd=GET_LIST_SERVER&order=${sorts[this.state.sortIndex].value}&keyword=${this.state.searchText}&status=${this.state.status}`});
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  onChangeSearchText = (text) => {
    const {serverListRequest} = this.props;
    this.setState({searchText: text}, ()=>{
      serverListRequest({Par: `cmd=GET_LIST_SERVER&order=${sorts[this.state.sortIndex].value}&keyword=${text}&status=${this.state.status}`});
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

  componentWillReceiveProps(nextProps){
    if(nextProps.serverListData && nextProps.serverListData != this.props.serverListData){
      this.setState({ isRefreshing: false });
    }
  }


  onRefresh() {
    this.setState({ isRefreshing: true });
    const {serverListRequest} = this.props;
    // startLoading()
    serverListRequest({Par: `cmd=GET_LIST_SERVER&order=${sorts[this.state.sortIndex].value}&keyword=${this.state.searchText}&status=${this.state.status}`});
  }

  /**
   * Render views
   */
  render() {
    const {
      navigateToServerDetailScreen,
      changeTabIndexServerDetail,
      serverListData,
      serverCountingData,
      alarmItemListRequest,
      serverListRequest,
      serverDetailRequest,
    } = this.props;
    const {sortIndex, searchText, status} = this.state;
    return (
      <Container>
      {/* {serverListData && console.log("__haha__", serverListData)} */}
      {/* {serverCountingData && console.log("__haha__", serverCountingData)} */}
        <StatusBar backgroundColor={AppColors.headerBg} />
        <HeaderMenuHome title={I18n.t('infra')} />
        <View style={{marginLeft: 5}}>
          <SearchBox title={I18n.t('searchServerHint')} value={searchText} onChangeText={this.onChangeSearchText}/>
        </View>
        <View style={{backgroundColor: '#f4f6f9'}}>
          <View style={{backgroundColor: 'white', marginLeft: 10, marginRight: 10, marginVertical: 10, flexDirection: 'row', padding: 10, borderRadius: 12}}>
            <TouchableOpacity
              onPress={()=>{
                this.setState({status: 'A'},()=>{
                  serverListRequest({Par: `cmd=GET_LIST_SERVER&order=${sorts[sortIndex].value}&keyword=${this.state.searchText}&status=${this.state.status}`});
                })
              }}>
              <Text style={{fontSize: normalize(15), color: AppColors.headerBg, fontWeight: 'bold'}}>Status</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <SimpleLineIcons name='clock' size={13}/>
                <Text style={{fontSize: normalize(12)}}>{" "+moment(new Date()).format('YYYY.MM.DD HH:mm')+"  "}</Text>
              </View>
            </TouchableOpacity>
            {
              serverCountingData && 
              <ScrollView horizontal={true}>
                <TouchableOpacity
                  onPress={()=>{
                    this.setState({status: 'U'},()=>{
                      serverListRequest({Par: `cmd=GET_LIST_SERVER&order=${sorts[sortIndex].value}&keyword=${this.state.searchText}&status=${this.state.status}`});
                    })
                  }}
                  style={{width: screenWidth/7, alignItems: 'center'}}>
                  <Text style={{fontSize: normalize(20), fontWeight: 'bold', color: AppColors.statusUp}}>{serverCountingData.up}</Text>
                  <Text style={{color: 'black'}}>UP</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={()=>{
                    this.setState({status: 'W'},()=>{
                      serverListRequest({Par: `cmd=GET_LIST_SERVER&order=${sorts[sortIndex].value}&keyword=${this.state.searchText}&status=${this.state.status}`});
                    })
                  }}
                  style={{width: screenWidth/7, alignItems: 'center'}}>
                  <Text style={{fontSize: normalize(20), fontWeight: 'bold', color: AppColors.statusWarn}}>{serverCountingData.warn}</Text>
                  <Text style={{color: 'black'}}>WARN</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={()=>{
                    this.setState({status: 'D'},()=>{
                      serverListRequest({Par: `cmd=GET_LIST_SERVER&order=${sorts[sortIndex].value}&keyword=${this.state.searchText}&status=${this.state.status}`});
                    })
                  }}
                  style={{width: screenWidth/7, alignItems: 'center'}}>
                  <Text style={{fontSize: normalize(20), fontWeight: 'bold', color: AppColors.statusDown}}>{serverCountingData.down}</Text>
                  <Text style={{color: 'black'}}>DOWN</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={()=>{
                    this.setState({status: 'P'},()=>{
                      serverListRequest({Par: `cmd=GET_LIST_SERVER&order=${sorts[sortIndex].value}&keyword=${this.state.searchText}&status=${this.state.status}`});
                    })
                  }}
                  style={{width: screenWidth/7, alignItems: 'center'}}>
                  <Text style={{fontSize: normalize(20), fontWeight: 'bold', color: AppColors.statusDisk}}>{serverCountingData.disk}</Text>
                  <Text style={{color: 'black'}}>DISK</Text>
                </TouchableOpacity>
              </ScrollView>
            }
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
            <View style={{flex: 1}}/>
            <Text style={{fontSize: normalize(15)}}>{I18n.t('sort')}</Text>
            <View style={styles.containerPicker} >
              <ModalDropdown 
                options={sorts} 
                style={{justifyContent: 'center', flex: 1, height: '100%',}}
                dropdownStyle={{height: normalize(102), marginTop: 10}}
                defaultValue={sorts[sortIndex].title}
                defaultIndex={sortIndex}
                onSelect={(index)=>{
                  this.setState({ sortIndex: index },()=>{
                    serverListRequest({Par: `cmd=GET_LIST_SERVER&order=${sorts[index].value}&keyword=${this.state.searchText}&status=${this.state.status}`});
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
          refreshing= {this.state.isRefreshing}
          onRefresh = {this.onRefresh.bind(this)}
          data={serverListData}
          ListEmptyComponent={<NoDataView/>}
          ItemSeparatorComponent={()=> <View style={{height: 1, width: '100%', backgroundColor: AppColors.textHolder}}/>}
          ListHeaderComponent={()=> <View style={{height: 1, width: '100%', backgroundColor: AppColors.textHolder}}/>}
          ListFooterComponent={()=> <View style={{height: 1, width: '100%', backgroundColor: AppColors.textHolder}}/>}
          renderItem={({ item }) =>
            <TouchableOpacity 
              onPress={()=>{
                SuperObjects.serverSelected = item;
                navigateToServerDetailScreen({gno: item.svr_no, status: item.status, os: item.os_gubn})
                changeTabIndexServerDetail(0)
                let langCode = I18n.languageCode
                serverDetailRequest({Par: `cmd=GET_INFO_SERVER&gno=${item.svr_no}&lang=${langCode}`})
                alarmItemListRequest({Par: `cmd=GET_LIST_ALARM_ITEM&gno=${item.svr_no}&lang=${langCode}`})
              }} 
              style={{flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: '6%', paddingVertical: 5}}>
              <Image style={{width: 25, height: 25}} resizeMode='contain' source={generateServerIcon(item.os_gubn,item.server_gubn)} />
              <View style={{backgroundColor: generateStatusColor(item.status), width: normalize(8), height: normalize(8), borderRadius: 5, marginLeft: 10, marginTop: -35}}/>
              <View style={{ flex: 1, marginLeft: 3}}>
                <Text style={{color: AppColors.textMain, fontSize: normalize(15)}}>{item.guest_name}</Text>
                <Text style={{color: '#a3a4a7', fontSize: normalize(12)}}>{item.ip}</Text>
              </View>
              <Image style={{width: 20, height: 20}} resizeMode='contain' source={Images.ico_arw} />
            </TouchableOpacity>
          }
          keyExtractor={item => item.id}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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