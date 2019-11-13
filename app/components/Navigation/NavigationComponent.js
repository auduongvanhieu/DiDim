import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Text, Button } from "native-base";
import AppNavigation from "./AppNavigation";
import { Config } from "../../utilities/Config";
import SplashScreen from "react-native-splash-screen";
import DropdownAlert from "react-native-dropdownalert";
import { normalize } from "../../utilities/ThemeUtils";

export default class NavigationComponent extends Component {
  componentWillMount() {}

  componentDidMount() {
    const {} = this.props;
    SplashScreen.hide();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alert !== this.props.alert) {
      this.dropdown.alertWithType(
        nextProps.alert.type,
        nextProps.alert.title,
        nextProps.alert.description
      );
    }
  }

  renderCenterLoading = () => {
    const { isLoading } = this.props;
    if (Boolean(isLoading))
      return (
        <View
          style={{
            flex: 1,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <ActivityIndicator color="#ffffff" size="small" />
            <Text style={{ color: "#ffffff", marginLeft: 8 }}>Loading...</Text>
          </View>
        </View>
      );
    else return null;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigation />
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        {this.renderCenterLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  modalContainer: {
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: normalize(8),
    padding: normalize(25)
  },
  innerContainer: {
    alignItems: "center"
  }
});
