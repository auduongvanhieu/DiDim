import React, { Component, createRef  } from 'react';
import {Header, Icon, Title} from 'native-base';
import {View, Dimensions, TouchableOpacity, Image, StatusBar} from "react-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { AppColors } from '../../utilities/Constants';
import { openNavigationDrawerAction, navigateToServerDetailScreenAction, navigateToAlarmLogDetailScreenAction } from '../../actions/NavigationActions/actionCreators';
import {Images} from '../../assets';
import { normalize } from "../../utilities/ThemeUtils";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Tooltip, Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Modal from "react-native-modal";
import Carousel from 'react-native-snap-carousel';
import { changeTabIndexServerDetailAction } from '../../actions/OthersActions/actionCreators';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const listAlert = [
  {
    title: "확인이 필요한 장애 알람이 3건이 있습니다.",
    image: Images.ico_alert_error
  },
  {
    title: "확인이 필요한 AS요청 답변이 2건이 있습니다.",
    image: Images.ico_alert_as
  }
]

class HeaderMenuHome extends Component {
  tooltipRef = createRef();

  constructor(props){
    super(props)
    this.state = {
      isModalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  _renderItem = ({item, index}) => {
    const {navigateToServerDetailScreen, navigateToAlarmLogDetailScreen, changeTabIndexServerDetail} = this.props
    return (
        <View style={{backgroundColor: 'white', height: screenWidth*4/5, borderRadius: 20}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{height: normalize(80)}} resizeMode='contain' source={index == 0 ? Images.ico_alert_error : Images.ico_alert_as} />
            <Text style={{fontSize: normalize(15), color: '#3b3b4d', marginTop: 10}}>{"Monitoring Alarm"}</Text>
            <Text style={{fontSize: normalize(12), color: '#6c7b8a', marginTop: 5}}>{ item.title }</Text>
          </View>
          <View style={{height: normalize(50)}}>
            <View style={{backgroundColor: '#6c7b8a', height: 0.5, width: '100%'}}/>
            <TouchableOpacity onPress={()=>{
              this.toggleModal();
              if(index == 0){
                changeTabIndexServerDetail(2);
                navigateToServerDetailScreen({tabIndex: 2});
              }
              else
                navigateToAlarmLogDetailScreen({hihi: 2});
            }} 
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#131315', fontSize: normalize(15)}}>CONTINUE ➝</Text>
            </TouchableOpacity>
          </View>
          <Ionicons 
            onPress={this.toggleModal} 
            color='black' size={40} name={'ios-close'} 
            style={{position: 'absolute', right: 10}}/>
        </View>
    );
  }
  
  render() {
    const { openNavigationDrawerAction, iconRight} = this.props;
    return (
      <Header style={{justifyContent: 'space-between', backgroundColor: AppColors.headerBg}}>
        <StatusBar backgroundColor={AppColors.headerBg}/>
        <SimpleLineIcons onPress={()=>{openNavigationDrawerAction()}} name={'menu'/*'navicon'*/} size={normalize(20)} style={{color: '#ff3b3b', alignSelf: 'center', marginLeft: normalize(3)}}/>
        <Title style={{alignSelf: 'center', flex: 1, textAlign: 'center', color: 'white'}}>{this.props.title}</Title>
        <View style={{position: 'absolute', right: 10, marginTop: 0, height: '100%', alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.toggleModal}>
            <MaterialCommunityIcons name={'bell-outline'} size={30} style={{color: 'white'}}/>
            <View style={{position: 'absolute', top: -3, right: -3, backgroundColor: 'red', width: normalize(15), height: normalize(15), justifyContent: 'center', borderRadius: normalize(10)}}>
              <Text style={{color: 'white', fontSize: 10, alignSelf: 'center'}}>{'10'}</Text>
            </View>
          </TouchableOpacity>
          { iconRight && iconRight}
        </View>
        <Modal 
          style={{marginLeft: 0}}
          animationIn='bounceIn'
          animationOut='bounceOut'
          isVisible={this.state.isModalVisible}>
          <View style={{}}>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={listAlert}
                renderItem={this._renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth*4/5}
              />
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

})

const mapDispatchToProps = dispatch => ({
  openNavigationDrawerAction: () => dispatch(openNavigationDrawerAction()),
  navigateToServerDetailScreen: (params) => dispatch(navigateToServerDetailScreenAction(params)),
  navigateToAlarmLogDetailScreen: (params) => dispatch(navigateToAlarmLogDetailScreenAction(params)),
  changeTabIndexServerDetail: (index) => dispatch(changeTabIndexServerDetailAction(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenuHome)