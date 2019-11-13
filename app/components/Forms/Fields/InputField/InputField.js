import React from 'react';
import { Image } from 'react-native';
import { Input, Text, } from 'native-base';
import styles from './InputField.styles';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import { Images } from '../../../../assets';
import { normalize } from '../../../../utilities/ThemeUtils';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * to be wrapped with redux-form Field component
 */
export default function InputField(props) {
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
          {(inputProps.leftImg || inputProps.leftComponent) &&
            <TouchableOpacity
              disabled={!inputProps.onLeftImgPress}
              onPress={() => { inputProps.onLeftImgPress && inputProps.onLeftImgPress() }}>
              {inputProps.leftComponent || <Image resizeMode='stretch' source={inputProps.leftImg} style={styles.leftImg} />}
            </TouchableOpacity>}
          <Input
            {...inputProps}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.value}
            clearButtonMode='while-editing'
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            editable={Boolean(inputProps.disabled || false) ? false : true}
            style={{ fontSize: normalize(15) }}
          />
          {(inputProps.rightImg || inputProps.rightComponent) &&
            <TouchableOpacity
              disabled={!inputProps.onRightImgPress}
              onPress={() => { inputProps.onRightImgPress && inputProps.onRightImgPress() }}>
              {inputProps.rightComponent || <Image resizeMode='stretch' source={inputProps.rightImg} style={styles.rightImg} />}
            </TouchableOpacity>}
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
        <View style={{
          width: 0,
          flexGrow: 1,
          flex: 1, justifyContent: 'center'
        }}>
          <Text style={[styles.value, { flex: 1, flexWrap: 'wrap', textAlign: 'right' }]}>{input.value}</Text>
        </View>
      </View>
    );
}

InputField.propTypes = {
  editable: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  leftComponent: PropTypes.any, // Left Component
  rightComponent: PropTypes.any, // Right Component
  leftImg: PropTypes.any, // Left Img
  rightImg: PropTypes.any, // Right Img
  onLeftImgPress: PropTypes.func,
  onRightImgPress: PropTypes.func,
  hideLabelInEditableMode: PropTypes.bool, //Hide label in editable mode
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