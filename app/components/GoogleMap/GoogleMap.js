import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Dimensions,
    StyleSheet,
    View,
    Text
} from 'react-native';
import { Button } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Jsons } from '../../assets';
import { getGeocodeRequestAction } from '../../actions/OthersActions/actionCreators';
import { Marker } from 'react-native-maps';
import { normalize } from '../../utilities/ThemeUtils';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

class GoogleMap extends Component {

    // Define prop types
    static propTypes = {
        province: PropTypes.string,
        district: PropTypes.string,
        ward: PropTypes.string,
        address: PropTypes.string,
    };

    // Set default prop values
    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = {
            paddingTop: 1
        }
        this._moveToCoords = this._moveToCoords.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { province, district, ward, address, getGeocodeRequest } = this.props;

        if (nextProps.province !== province ||
            nextProps.district !== district ||
            nextProps.ward !== ward ||
            nextProps.address !== address) {
            let srchAddress = `${nextProps.address || ""} ${nextProps.ward || ""} ${nextProps.district || ""} ${nextProps.province || ""}`.trim();
            getGeocodeRequest && getGeocodeRequest({
                address: srchAddress,
                key: "AIzaSyAEOEGh2_im3wRMcgBewibeguCKbnsqw1w"
            })
        }

    }

    _onMapReady = () => this.setState({ paddingTop: 0 })

    _moveToCoords = (coords) => {
        if(this.map) {
            this.map.animateToCoordinate(coords, 1);
        }
    }

    render() {
        const { style, province, district, ward, address, geocode } = this.props;
        let location = geocode && geocode.results && geocode.results.length > 0 && geocode.results[0].geometry.location;
        return (
            <View style={style}>
                <MapView
                    ref={(ref) => this.map = ref}
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    followsUserLocation={true}
                    loadingEnabled={true}
                    toolbarEnabled={true}
                    zoomEnabled={true}
                    rotateEnabled={true}
                    style={[{ width: "100%", height: 60 }, style, { paddingTop: this.state.paddingTop }]}
                    onMapReady={this._onMapReady}
                    region={{
                        latitude: (location && location.lat) || 37.78825,
                        longitude: (location && location.lng) || -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    {
                        province && district && ward && address &&
                        <Marker
                            coordinate={{
                                latitude: (location && location.lat) || 37.78825,
                                longitude: (location && location.lng) || -122.4324
                            }}
                            title={"Vị trí của bạn"}
                            description={"Vị trí hiện tại"}
                        />
                    }

                </MapView>

                <Button transparent style={{ position: 'absolute', top: 0, left: 8 }}
                    onPress={() => {
                        this._moveToCoords({
                            latitude: (location && location.lat) || 37.78825,
                            longitude: (location && location.lng) || -122.4324
                        })
                    }}>
                    <MaterialIcons name="location-searching" style={{ fontSize: normalize(26) }} />
                </Button>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

const mapStateToProps = state => ({
    geocode: state.geocode.receivedData
})

const mapDispatchToProps = dispatch => ({
    getGeocodeRequest: (address) => dispatch(getGeocodeRequestAction(address)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap)