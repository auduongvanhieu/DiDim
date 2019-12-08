import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native';
import { Row, Col } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default class SearchBox extends Component {

  // Define prop types
  static propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    keyboardType: PropTypes.string,
  };

  // Set default prop values
  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {title, value, onChangeText, keyboardType} = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerContainer2}>
          <Ionicons
            name="ios-search"
            color="#6c7b8a"
            size={25}
            style={{ alignSelf: "center" }}
          />
        </View>
        <TextInput
          onChangeText={onChangeText}
          value={value}
          style={{ flex: 1 }}
          placeholder={title}
          keyboardType={keyboardType ? keyboardType : 'default'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    borderColor: "#eeeeee",
    padding: 0,
    height: 60
  },
  headerContainer2: {
    height: "100%",
    width: 40,
    justifyContent: "center",
  }
});