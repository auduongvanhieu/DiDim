import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 Dimensions,
 StyleSheet,
 TouchableOpacity,
 Text
} from 'react-native';
import {
} from 'native-base';
import { AppColors, AppConstant } from '../../utilities/Constants';
import { normalize } from '../../utilities/ThemeUtils';

// Get screen dimensions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const aspecRatio = screenHeight / screenWidth;

export default class TextLink extends Component {
 // Define prop types
 static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    style: PropTypes.any
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
   const { title, onPress, style} = this.props;
   return(
    <TouchableOpacity style={style} onPress={onPress}>
        <Text style={styles.titleText} >
            {title}
        </Text>
    </TouchableOpacity>
   );
 }
}
const styles = StyleSheet.create({
    titleText: {
        color: 'blue',
        marginTop: 20,
        textAlign: "center",
        fontSize: 15,
        textDecorationLine: 'underline',
    }
});