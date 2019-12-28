import React, { Component, createRef  } from 'react';
import {Header, Icon, Title} from 'native-base';
import {View, Dimensions, TouchableOpacity, Image, StatusBar} from "react-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { AppColors } from '../../utilities/Constants';
import { openNavigationDrawerAction, goBackAction } from '../../actions/NavigationActions/actionCreators';
import {Images} from '../../assets';
import { normalize } from "../../utilities/ThemeUtils";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class HeaderMenu extends Component {
  tooltipRef = createRef();

  constructor(props){
    super(props)
  }
  render() {
    const { openNavigationDrawerAction, goBackAction, rightIcon, backAction } = this.props;
    return (
      <Header style={{justifyContent: 'space-between', backgroundColor: AppColors.headerBg2}}>
        <StatusBar backgroundColor={AppColors.headerBg2}/>
        <SimpleLineIcons onPress={()=>{openNavigationDrawerAction()}} name={'menu'} size={normalize(20)} style={{color: 'white', alignSelf: 'center', marginLeft: normalize(3)}}/>
        <Title style={{alignSelf: 'center', flex: 1, textAlign: 'center', color: 'white'}}>{this.props.title}</Title>
        {
          rightIcon ? 
          rightIcon :
          <AntDesign onPress={()=>{backAction ? backAction() : goBackAction()}} name={'arrowleft'} size={normalize(20)} style={{color: 'white', alignSelf: 'center', marginLeft: normalize(3)}}/>
        }
      </Header>
    );
  }
}

HeaderMenu.propTypes = {
  title: PropTypes.string,
  rightIcon: PropTypes.any,
  backAction: PropTypes.func
};

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  openNavigationDrawerAction: () => dispatch(openNavigationDrawerAction()),
  goBackAction: () => dispatch(goBackAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu)