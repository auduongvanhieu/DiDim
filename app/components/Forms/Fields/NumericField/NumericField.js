import React from 'react';
import { Image } from 'react-native';
import { Input, Text, } from 'native-base';
import styles from './NumericField.styles';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import NumericInput from 'react-native-numeric-input'
import { normalize } from '../../../../utilities/ThemeUtils';

/**
 * to be wrapped with redux-form Field component
 */
export default function NumericField(props) {
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
          <Text style={styles.label}>{inputProps.label}</Text>
          <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
            <NumericInput
              initValue={input.value || 0}
              value={input.value || 0}
              minValue={0}
              onChange={input.onChange}
              editable={true}
              totalWidth={normalize(100)}
              totalHeight={normalize(25)}
              iconSize={normalize(25)}
              step={1}
              valueType='integer'
              rounded
              textColor='#005b7f'
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='#005b7f'
              leftButtonBackgroundColor='#005b7f'
              
              {...inputProps} 
              editable={false}/>
          </View>
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
        <View style={{ flexGrow: 1 }}>
          <Text style={[styles.value, { textAlign: 'right' }]}>{input.value}</Text>
        </View>
      </View>
    );
}

NumericField.propTypes = {
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