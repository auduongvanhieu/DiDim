import React from "react";
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import PropTypes from 'prop-types';

export default class LabeledSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.toggle = this.toggle.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // update local state.value if props.value changes....
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }
  toggle() {
    // define how we will use LayoutAnimation to give smooth transition between state change
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    const newValue = !this.state.value;
    this.setState({
      value: newValue
    });

    // fire function if exists
    if (typeof this.props.onValueChange === "function") {
      this.props.onValueChange(newValue);
    }
  }
  render() {
    const { value } = this.state;

    return (
      <TouchableOpacity onPress={this.toggle} style={{justifyContent: 'center'}}>
        <View style={[styles.container, value && styles.activeContainer]}>
          <View style={[styles.circle, value && styles.activeCircle]}>
            <View style={styles.circleChild}/>
          </View>
          {/* <Text style={styles.label}>{value ? "YES" : "NO"}</Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}

LabeledSwitch.propTypes = {
  onValueChange: PropTypes.func,
  value: PropTypes.bool
};

LabeledSwitch.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 5,
    backgroundColor: "grey",
    flexDirection: "row",
    overflow: "visible",
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 1.0,
    shadowOffset: {
      width: -2,
      height: 2
    },
    alignSelf: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 17,
    backgroundColor: "pink",
    shadowColor: "black",
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 2,
      height: 2
    },
    alignSelf: 'center',
    justifyContent: 'center'
  },
  activeCircle: {
    backgroundColor: "red",
  },
  circleChild: {
    width: 10,
    height: 10,
    borderRadius: 17,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 2,
      height: 2
    },
    alignSelf: 'center'
  },
  activeContainer: {
    backgroundColor: "pink",
    flexDirection: "row-reverse"
  },
  label: {
    alignSelf: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 6,
    fontWeight: "bold"
  }
});

