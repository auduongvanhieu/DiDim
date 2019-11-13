import React from 'react';
import { Image } from 'react-native';
import { Input, Text, CheckBox } from 'native-base';
import styles from './CheckBoxField.styles';
import PropTypes from 'prop-types';
import { View, ListItem } from 'native-base';
import { Images } from '../../../../assets';

/**
 * to be wrapped with redux-form Field component
 */
export default function CheckBoxField(props) {
    const { input, meta, ...inputProps } = props;
    // do not display warning if the field has not been touched or if it's currently being edited
    const validationStyles = meta.touched && !meta.active
        ? meta.valid ? styles.valid : styles.invalid
        : null;
    const editable = String(inputProps.editable) === 'true' || String(inputProps.editable) === 'undefined';
    //Switch between readable and editable mode
    if (editable)
        return (
            <View>
                {!inputProps.hideLabelInEditableMode ? <Text style={styles.label}>{inputProps.label}</Text> : null}
                <View style={[styles.inputContainer]}>
                    {inputProps.leftImg ? <Image resizeMode='stretch' source={inputProps.leftImg} style={styles.leftImg} /> : null}
                    <ListItem disabled={!Boolean(editable)} noBorder {...inputProps} onPress={() => {
                        input.onChange(!Boolean(input.value || false));
                    }}>
                        {Boolean(input.value || false) ?
                            <Image resizeMode='stretch' source={Images.icCheckedBox} style={{ height: 20, width: 20 }} /> :
                            <Image resizeMode='stretch' source={Images.icUncheckedBox} style={{ height: 20, width: 20 }} />
                        }
                        <Text style={{ marginLeft: 6 }}>{props.label}</Text>
                    </ListItem>

                </View>
                {
                    meta.touched && !meta.active
                        ? meta.invalid ?
                            <Text style={styles.txtError}>{meta.error}</Text>
                            :
                            null
                        : null
                }
            </View>
        );
    else
        return (
            <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 8 }}>
                <Text style={styles.label}>{inputProps.label || inputProps.placeholder}</Text>
                <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                    <View>
                        {Boolean(input.value || false) ?
                            <Image source={Images.icCheckedBox} style={{ height: 20, width: 20 }} /> :
                            <Image source={Images.icUncheckedBox} style={{ height: 20, width: 20 }} />
                        }
                    </View>
                </View>
            </View>
        );
}

CheckBoxField.propTypes = {
    input: PropTypes.shape({
        onBlur: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        onFocus: PropTypes.func.isRequired,
        value: PropTypes.any.isRequired
    }).isRequired,
    meta: PropTypes.shape({
        active: PropTypes.bool.isRequired,
        error: PropTypes.string,
        invalid: PropTypes.bool.isRequired,
        pristine: PropTypes.bool.isRequired,
        visited: PropTypes.bool.isRequired
    }).isRequired
};