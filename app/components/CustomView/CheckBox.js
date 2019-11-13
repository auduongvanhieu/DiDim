import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text
} from "react-native";
import {} from "native-base";
import { Images } from "../../assets";
import { normalize } from "../../utilities/ThemeUtils";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

export default class CheckBox extends Component {
  // Define prop types
  static propTypes = {
    checked: PropTypes.bool,
    text: PropTypes.string,
    onCheck: PropTypes.func
  };

  // Set default prop values
  static defaultProps = {
    checked: false,
    text: "",
    onCheck: checked => {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { checked, onCheck, text } = this.props;
    return (
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => {
          onCheck(!Boolean(checked));
        }}
      >
        <Image
          resizeMode="stretch"
          style={styles.icCheckBox}
          source={
            Boolean(checked) ? Images.icCheckedBox : Images.icUncheckedBox
          }
        />
        <Text style={{ marginLeft: 8, color: "black", fontSize: 15 }}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  icCheckBox: {
    height: normalize(20),
    width: normalize(20)
  }
});
