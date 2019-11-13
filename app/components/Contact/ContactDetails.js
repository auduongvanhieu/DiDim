import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity
} from "react-native";
import {} from "native-base";
import { normalize } from "../../utilities/ThemeUtils";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

export default class ContactDetails extends Component {
  // Define prop types
  static propTypes = {};

  // Set default prop values
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL("http://www.didim365.com");
        }}
        style={styles.toPad}
      >
        <Text style={styles.txtLink}>www.didim365.com{"\n"}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  txtLink: {
    textAlign: "center",
    fontSize: normalize(12),
    color: "#35444f"
  },
  toPad: {
    padding: 12
  }
});
