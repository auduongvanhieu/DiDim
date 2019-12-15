import React, { Component, createRef  } from 'react';
import {Header, Icon, Title} from 'native-base';
import {View, Dimensions, TouchableOpacity, Image, StatusBar, Platform} from "react-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { AppColors } from '../../utilities/Constants';
import {
  openNavigationDrawerAction,
  navigateToServerDetailScreenAction,
  navigateToSupportViewScreenAction,
  navigateToSupportCenterScreenAction,
  navigateToAlarmLogScreenAction
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
  asRequestDetailRequestAction,
  serverCountingRequestAction,
  serverListRequestAction
} from "../../actions/OthersActions/actionCreators";
import I18n from '../../I18n'
import { setNotification, getNotification, updateNotification } from '../../utilities/Helper';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
class HeaderMenuHome extends Component {
  tooltipRef = createRef();

  constructor(props){
    super(props)
    this.state = {
      isModalVisible: false,
      listAlert: [
        {
          title : "확인이 필요한 장애 알람이 0건이 있습니다.",
          image : Images.ico_alert_error,
          type : "DownAlert"
        },
        {
          title : "확인이 필요한 AS요청 답변이 0건이 있습니다.",
          image : Images.ico_alert_as,
          type : "AsRequest"
        }
      ],
      activeSlide: 0,
      numberNotify: 0
    };
  }

  componentDidMount(){
    this.props.asRequestListRequest({Par: 'cmd=GET_LIST_AS_REQUEST'});
    this.props.serverCountingRequest({Par: "cmd=GET_COUNT_ALERT_AND_AS"});
    this.props.serverListRequest({Par: `cmd=GET_LIST_SERVER`});
  }

  async componentWillReceiveProps(nextProps){
    if(nextProps.serverCountingData && nextProps.serverCountingData != this.props.serverCountingData){
      const {serverCountingData} = nextProps;
      this.setState({numberNotify: serverCountingData.total})
      this.state.listAlert[0].title = I18n.languageCode == 'ko' ? 
          `${I18n.t('arlarmNotify')} ${serverCountingData.down} ${I18n.t('thereAre')}`:
          `${I18n.t('thereAre')} ${serverCountingData.down} ${I18n.t('arlarmNotify')}`
      this.state.listAlert[1].title = I18n.languageCode == 'ko' ?
          `${I18n.t('asNotify')} ${serverCountingData.as} ${I18n.t('thereAre')}`:
          `${I18n.t('thereAre')} ${serverCountingData.as} ${I18n.t('asNotify')}`
    }
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  _renderItem = ({item, index}) => {
    const {
      navigateToServerDetailScreen,
      navigateToSupportCenterScreen,
      changeTabIndexServerDetail,
      alarmItemListRequest,
      navigateToAlarmLogScreen
    } = this.props;
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

              if(item.type == "DownAlert"){
                // navigateToServerDetailScreen({tabIndex: 2});
                // changeTabIndexServerDetail(2);
                // alarmItemListRequest({Par: `cmd=GET_LIST_ALARM_ITEM&gno=${item.svr_no}`})
                navigateToAlarmLogScreen();
              } else {
                navigateToSupportCenterScreen();
              }
            }} 
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#131315', fontSize: normalize(15)}}>CONTINUE ➝</Text>
            </TouchableOpacity>
          </View>
          <Ionicons 
            onPress={this.toggleModal} 
            onPress={this.toggleModal} 
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
    const { openNavigationDrawerAction, iconRight, serverCountingData} = this.props;
    const {listAlert, numberNotify} = this.state;
    return (
      <Header style={{justifyContent: 'space-between', backgroundColor: AppColors.headerBg}}>
        <StatusBar backgroundColor={AppColors.headerBg}/>
        <SimpleLineIcons onPress={()=>{openNavigationDrawerAction()}} name={'menu'/*'navicon'*/} size={normalize(20)} style={{color: '#ff3b3b', alignSelf: 'center', marginLeft: normalize(3)}}/>
        <Title style={{alignSelf: 'center', flex: 1, textAlign: 'center', color: 'white'}}>{this.props.title}</Title>
        <View style={{position: 'absolute', right: 10, marginTop: Platform.OS == 'ios' ? 18 : 0, height: '100%', alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.toggleModal}>
            <MaterialCommunityIcons name={'bell-outline'} size={30} style={{color: 'white'}}/>
            { serverCountingData &&
            <View style={{position: 'absolute', top: -3, right: -3, backgroundColor: 'red', width: normalize(15), height: normalize(15), justifyContent: 'center', borderRadius: normalize(10)}}>
                <Text style={{color: 'white', fontSize: 10, alignSelf: 'center'}}>{numberNotify}</Text>              
            </View>
            }
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
  serverCountingData: state.otherReducer.serverCountingData,
})

const mapDispatchToProps = dispatch => ({
  openNavigationDrawerAction: () => dispatch(openNavigationDrawerAction()),
  navigateToServerDetailScreen: (params) => dispatch(navigateToServerDetailScreenAction(params)),
  navigateToSupportCenterScreen: (params) => dispatch(navigateToSupportCenterScreenAction(params)),
  navigateToAlarmLogScreen: (params) => dispatch(navigateToAlarmLogScreenAction(params)),
  changeTabIndexServerDetail: (index) => dispatch(changeTabIndexServerDetailAction(index)),
  alarmItemListRequest: (params) => dispatch(alarmItemListRequestAction(params)),
  asRequestListRequest: (params) => dispatch(asRequestListRequestAction(params)),
  asRequestDetailRequest: (params) => dispatch(asRequestDetailRequestAction(params)),
  serverCountingRequest: (params) => dispatch(serverCountingRequestAction(params)),
  serverListRequest: (index) => dispatch(serverListRequestAction(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenuHome)