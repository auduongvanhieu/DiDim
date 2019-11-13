import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    StyleSheet,
    View,
    TextInput,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';
import {

} from 'native-base';
import { connect } from 'react-redux'
import { searchPlaceRequestAction } from '../../actions/OthersActions/actionCreators';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

// Get screen dimensions
const { width, height } = Dimensions.get('window');

class AutoCompleteAddressComponent extends Component {

    // Define prop types
    static propTypes = {
        onClickPlace: PropTypes.func,
        textSearch: PropTypes.string,
        onSelectAddress: PropTypes.func
    };

    // Set default prop values
    static defaultProps = {
        onSelectAddress: (address) => { }
    };

    constructor(props) {
        super(props);
        this.state = {
            hideResult: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.textSearch !== this.props.textSearch) {
            this.props.searchPlaceRequest({
                input: nextProps.textSearch
            })
        }
    }

    _getTermAt = (item, offset, space) => {
        item && item.terms.map((term) => {
            if (Number(term.offset) === Number(offset)) {
                address = term.value;
            }
        });
        return `${space} ${address}`;
    }

    _onSelectAddress = (item) => {
        this.setState({ hideResult: true }, () => {
            const { onSelectAddress } = this.props;
            var address = this._getTermAt(item, 0, "");
            onSelectAddress(address);
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!(nextProps.textSearch === this.props.textSearch)) {
            this.setState({ hideResult: false });
        }
    }


    render() {
        const { listPlace, onClickPlace, textSearch } = this.props;
        const { hideResult } = this.state;
        return (
            <View>
                {
                    listPlace && !Boolean(hideResult) &&
                    <FlatList
                        data={listPlace}
                        renderItem={({ item }) => {
                            if (!(this._getTermAt(item, 0, "") === textSearch)) {
                                return (<TouchableOpacity onPress={() => { this._onSelectAddress(item) }} style={{ backgroundColor: 'white', paddingVertical: 5, justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <SimpleLineIcons name="location-pin" size={15} style={{ paddingHorizontal: 5, alignSelf: 'center' }} />
                                        <Text>{item.description}</Text>
                                    </View>
                                    <View style={{ height: 1, width: '100%', backgroundColor: '#f2f2f2', position: 'absolute', bottom: 0 }} />
                                </TouchableOpacity>);
                            }
                            else return null;
                        }

                        }
                        keyExtractor={item => item.id}
                    />
                }

            </View>

        );
    }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => ({
    listPlace: state.searchPlaceReducer.receivedData,
})

const mapDispatchToProps = dispatch => ({
    searchPlaceRequest: (params) => dispatch(searchPlaceRequestAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteAddressComponent)