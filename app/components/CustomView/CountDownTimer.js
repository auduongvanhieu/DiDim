import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {

} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { normalize } from '../../utilities/ThemeUtils';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default class CountDownTimer extends Component {

  // Define prop types
  static propTypes = {
    startTime: PropTypes.number,
    style: PropTypes.array
  };

  // Set default prop values
  static defaultProps = {
  };
  
  constructor(props) {
    super(props);
    this.state = { 
        timer: props.startTime
    }
  }
  
  componentDidMount(){
    this.interval = setInterval(
      () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
      1000
    );
  }
  
  componentDidUpdate(){
    if(this.state.timer === 1){ 
      clearInterval(this.interval);
    }
  }
  
  componentWillUnmount(){
   clearInterval(this.interval);
  }
  
  render() {
    const {style} = this.props
    var hour = parseInt(this.state.timer / 3600)
    var minute = parseInt(this.state.timer / 60) % 60
    var second = this.state.timer % 60
    return (
      <View style={[styles.container,style]}>
        <View style={styles.container1}>
            <Text style={styles.text}> {hour<10 && '0'}{hour} </Text>
        </View>
        <View style={{width: 5}}/>
        <View style={styles.container1}>
            <Text style={styles.text}> {minute<10 && '0'}{minute} </Text>
        </View>
        <View style={{width: 5}}/>
        <View style={styles.container1}>
            <Text style={styles.text}> {second<10 && '0'}{second} </Text>
        </View>
      </View> 
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    container1: {
        backgroundColor: 'red',
        width: normalize(25),
        height: normalize(25),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(8),
    },
    text: {
        fontSize: normalize(15),
        color: 'white',
        fontWeight: 'bold',
    }
});