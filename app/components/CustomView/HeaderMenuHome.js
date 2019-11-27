import React, { Component, createRef  } from 'react';
import {Header, Icon, Title} from 'native-base';
import {View, Dimensions, TouchableOpacity, Image, StatusBar} from "react-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { AppColors } from '../../utilities/Constants';
import {
  openNavigationDrawerAction,
  navigateToServerDetailScreenAction,
  navigateToSupportViewScreenAction
} from "../../actions/NavigationActions/actionCreators";
import {Images} from '../../assets';
import { normalize } from "../../utilities/ThemeUtils";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Tooltip, Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Modal from "react-native-modal";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  changeTabIndexServerDetailAction,
  alarmItemListRequestAction,
  asRequestListRequestAction,
  asRequestDetailRequestAction
} from "../../actions/OthersActions/actionCreators";
import { setNotification, getNotification, updateNotification } from '../../utilities/Helper';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class HeaderMenuHome extends Component {
  tooltipRef = createRef();

  constructor(props){
    super(props)
    this.state = {
      isModalVisible: false,
      listAlert: [],
      activeSlide: 0
    };
  }

  componentDidMount(){
    this.props.asRequestListRequest({Par: 'cmd=GET_LIST_AS_REQUEST'});
  }

  async componentWillReceiveProps(nextProps){
    if(nextProps.serverListData && nextProps.serverListData != this.props.serverListData){
      const {serverListData} = nextProps;
      var listAlertTemp = [];
      serverListData.forEach(item => {
        if(item.status == "D"){
          item.title = "확인이 필요한 장애 알람이 3건이 있습니다.";
          item.image = Images.ico_alert_error;
          item.type = "DownAlert";
          item.id = "svr_no_"+item.svr_no;
          item.seen = false;
          listAlertTemp.push(item);
        }
      });
      await setNotification(listAlertTemp);
      var listAlertStorage = await getNotification();
      var listAlert = listAlertStorage.filter(e => e.seen == false);     
      this.setState({listAlert: listAlert});
    }
    if(nextProps.asRequestListData && nextProps.asRequestListData != this.props.asRequestListData){
      const {asRequestListData} = nextProps;
      var listAlertTemp = [];
      asRequestListData.forEach(item => {
        item.title = "확인이 필요한 AS요청 답변이 2건이 있습니다.";
        item.image = Images.ico_alert_as;
        item.type = "AsRequest";
        item.id = "board_idx_"+item.board_idx;
        item.seen = false;
        listAlertTemp.push(item);
      });
      await setNotification(listAlertTemp);
      var listAlertStorage = await getNotification();
      var listAlertFilter = listAlertStorage.filter(e => e.seen == false)
      this.setState({listAlert: listAlertFilter});
    }
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  _renderItem = ({item, index}) => {
    const {
      navigateToServerDetailScreen,
      navigateToSupportViewScreen,
      changeTabIndexServerDetail,
      alarmItemListRequest,
      asRequestDetailRequest
    } = this.props;
    if(item.seen == false)
    return (
        <View style={{backgroundColor: 'white', height: screenWidth*4/5, borderRadius: 20}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{height: normalize(80)}} resizeMode='contain' source={item.image} />
            <Text style={{fontSize: normalize(15), color: '#3b3b4d', marginTop: 10}}>{"Monitoring Alarm"}</Text>
            <Text style={{fontSize: normalize(12), color: '#6c7b8a', marginTop: 5}}>{ item.title }</Text>
          </View>
          <View style={{height: normalize(50)}}>
            <View style={{backgroundColor: '#6c7b8a', height: 0.5, width: '100%'}}/>
            <TouchableOpacity onPress={async ()=>{
              this.toggleModal();

              const { listAlert } = this.state;
              await updateNotification(listAlert[index]);
              var listAlertStorage = await getNotification();
              var listAlertFilter = listAlertStorage.filter(e => e.seen == false)
              this.setState({listAlert: listAlertFilter});

              if(item.type == "DownAlert"){
                navigateToServerDetailScreen({tabIndex: 2});
                changeTabIndexServerDetail(2);
                alarmItemListRequest({Par: `cmd=GET_LIST_ALARM_ITEM&gno=${item.svr_no}`})
              } else {
                  navigateToSupportViewScreen({board_idx: item.board_idx});
                  asRequestDetailRequest({Par: `cmd=GET_INFO_AS_REQUEST&board_idx=${item.board_idx}`})
              }
            }} 
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#131315', fontSize: normalize(15)}}>CONTINUE ➝</Text>
            </TouchableOpacity>
          </View>
          <Ionicons 
            onPress={this.toggleModal} 
            onPress={async () =>{
              const { listAlert } = this.state;

              await updateNotification(listAlert[index]);
              var listAlertStorage = await getNotification();
              var listAlertFilter = listAlertStorage.filter(e => e.seen == false)
              this.setState({listAlert: listAlertFilter});
            }} 
            color='black' size={40} name={'ios-close'} 
            style={{position: 'absolute', right: 10}}/>
        </View>
    );
  }

  get pagination () {
    const { listAlert, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={listAlert.length}
          activeDotIndex={activeSlide}
          containerStyle={{}}
          dotStyle={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
          }}
          inactiveDotStyle={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: 'white'          
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
}
  
  render() {
    const { openNavigationDrawerAction, iconRight} = this.props;
    const {listAlert} = this.state;
    return (
      <Header style={{justifyContent: 'space-between', backgroundColor: AppColors.headerBg}}>
        <StatusBar backgroundColor={AppColors.headerBg}/>
        <SimpleLineIcons onPress={()=>{openNavigationDrawerAction()}} name={'menu'/*'navicon'*/} size={normalize(20)} style={{color: '#ff3b3b', alignSelf: 'center', marginLeft: normalize(3)}}/>
        <Title style={{alignSelf: 'center', flex: 1, textAlign: 'center', color: 'white'}}>{this.props.title}</Title>
        <View style={{position: 'absolute', right: 10, marginTop: 0, height: '100%', alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.toggleModal}>
            <MaterialCommunityIcons name={'bell-outline'} size={30} style={{color: 'white'}}/>
            <View style={{position: 'absolute', top: -3, right: -3, backgroundColor: 'red', width: normalize(15), height: normalize(15), justifyContent: 'center', borderRadius: normalize(10)}}>
              <Text style={{color: 'white', fontSize: 10, alignSelf: 'center'}}>{listAlert.length}</Text>
            </View>
          </TouchableOpacity>
          { iconRight && iconRight}
        </View>
        <Modal 
          style={{marginLeft: 0}}
          animationIn='bounceIn'
          animationOut='bounceOut'
          onBackButtonPress={this.toggleModal}
          onBackdropPress={this.toggleModal}
          isVisible={this.state.isModalVisible}>
          <View style={{}}>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={listAlert}
                renderItem={this._renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth*4/5}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
              />
              { this.pagination }
            </View>
        </Modal>
      </Header>
    );
  }
}

HeaderMenuHome.propTypes = {
  title: PropTypes.string,
  iconRight: PropTypes.any
};

const mapStateToProps = state => ({
  serverListData: state.otherReducer.serverListData,
  asRequestListData: state.otherReducer.asRequestListData,
})

const mapDispatchToProps = dispatch => ({
  openNavigationDrawerAction: () => dispatch(openNavigationDrawerAction()),
  navigateToServerDetailScreen: (params) => dispatch(navigateToServerDetailScreenAction(params)),
  navigateToSupportViewScreen: (params) => dispatch(navigateToSupportViewScreenAction(params)),
  changeTabIndexServerDetail: (index) => dispatch(changeTabIndexServerDetailAction(index)),
  alarmItemListRequest: (params) => dispatch(alarmItemListRequestAction(params)),
  asRequestListRequest: (params) => dispatch(asRequestListRequestAction(params)),
  asRequestDetailRequest: (params) => dispatch(asRequestDetailRequestAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenuHome)