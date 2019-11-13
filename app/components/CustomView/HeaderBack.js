import React, { Component  } from 'react';
import {Header, Icon, Title} from 'native-base';
import {View, Dimensions} from "react-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { AppColors } from '../../utilities/Constants';
import { goBackAction } from '../../actions/NavigationActions/actionCreators';
import Images from '../../assets';
import { normalize } from "../../utilities/ThemeUtils";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Tooltip, Text } from 'react-native-elements';
import { Button } from 'react-native-elements';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class HeaderBack extends Component {

  constructor(props){
    super(props)
  }
  
  render() {
    const { goBackAction } = this.props;
    return (
      <Header style={{justifyContent: 'space-between', backgroundColor: AppColors.headerBg, elevation: 0}}>
        <FontAwesome onPress={()=>{goBackAction()}} name={'reply'} size={normalize(20)} style={{color: AppColors.darkMain, alignSelf: 'center', marginLeft: normalize(3)}}/>
        <Title style={{alignSelf: 'center', marginLeft: 10, flex: 1, textAlign: 'left', color: 'white'}}>{this.props.title}</Title>
        <FontAwesome size={normalize(20)}/>
      </Header>
    );
  }
}

HeaderBack.propTypes = {
  title: PropTypes.string
};

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  goBackAction: () => dispatch(goBackAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBack)