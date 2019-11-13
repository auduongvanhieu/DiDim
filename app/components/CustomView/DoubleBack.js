import React, { Component } from 'react';
import { BackHandler, View, Dimensions, Animated, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
const { width, height } = Dimensions.get('window');


export default class DoubleBack extends Component {

    // Define prop types
    static propTypes = {
        onExit: PropTypes.func,
    };

    // Set default prop values
    static defaultProps = {
        onExit: (checked) => { }
    };


    state = {
        backClickCount: 0
    };

    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(100);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    _spring() {
        this.setState({ backClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.15 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),

            ]).start(() => {
                this.setState({ backClickCount: 0 });
            });
        });

    }


    handleBackButton = () => {
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
        return true;
    };


    render() {

        return (
            <View style={styles.container}>
                {this.props.children}

                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={styles.exitTitleText}>Nhấn nút lần nữa để thoát ứng dụng</Text>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => BackHandler.exitApp()}
                    >
                        <Text style={styles.exitText}>THOÁT</Text>
                    </TouchableOpacity>

                </Animated.View>
            </View>
        );
    }
}


const styles = {
    container: {
        flex: 1
    },
    animatedView: {
        width,
        backgroundColor: "#0a5386",
        elevation: 2,
        position: "absolute",
        bottom: 0,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    exitTitleText: {
        textAlign: "center",
        color: "#ffffff",
        marginRight: 10,
    },
    exitText: {
        color: "#e5933a",
        paddingHorizontal: 10,
        paddingVertical: 3
    }
};
