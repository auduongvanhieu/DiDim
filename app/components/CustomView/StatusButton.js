import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    StyleSheet,
    View,
    Text
} from 'react-native';
import { normalize } from 'react-native-elements';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default class StatusButton extends Component {

    // Define prop types
    static propTypes = {
        widthSize: PropTypes.number,
        bgColor: PropTypes.any,
        title: PropTypes.string,
        style: PropTypes.any
    };

    // Set default prop values
    static defaultProps = {

    };

    constructor(props) {
        super(props);

    }

    render() {
        const { widthSize, bgColor, title, style, children } = this.props;
        if (children)
            return (
                <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }, styles.Container, style && style, widthSize && { width: widthSize }, bgColor && { backgroundColor: bgColor }]}>
                    {children}
                </View>
            );
        else
            return (
                <View style={[styles.Container, style && style, widthSize && { width: widthSize }, bgColor && { backgroundColor: bgColor }]}>
                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: normalize(8) }}>{title}</Text>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        height: normalize(14),
        width: 30,
        backgroundColor: 'blue',
        borderRadius: 15,
        justifyContent: 'center'
    }
});