import React, { Component } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Dimensions, View, Text, } from "react-native";
import { AppColors } from '../../utilities/Constants';

// Get screen dimensions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const aspecRatio = screenHeight / screenWidth;

export default class NoDataView extends Component {
    render() {
        return (
            <View style={{height: screenHeight*2/3, justifyContent: 'center'}} >
                <MaterialIcons style={{alignSelf: 'center'}} name={'no-sim'} size={50} color={AppColors.primaryColor} />            
                <Text style={{alignSelf: 'center', color: AppColors.primaryColor}}>No data</Text>
            </View>
        )
    }
}
