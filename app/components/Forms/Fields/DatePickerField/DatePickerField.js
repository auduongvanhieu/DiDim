import React from 'react';
import { View, Text } from 'react-native';
import { } from 'native-base';
import styles from './DatePickerField.styles';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker'

/**
 * to be wrapped with redux-form Field component
 */
export default function DatePickerField(props) {
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
        <View style={[styles.inputContainer, validationStyles]}>
          <DatePicker
            {...inputProps}
            style={{ width: null }}
            date={input.value}
            mode="date"
            placeholder={inputProps.placeholder}
            format={inputProps.customFormat || "DD/MM/YYYY"}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: inputProps.dateIconStyles || styles.dateIcon,
              dateInput: inputProps.dateInputStyles || styles.dateInput,
              placeholderText: inputProps.placeholderTextStyles || styles.placeholderText
            }}
            confirmBtnText="OK"
            cancelBtnText="Hủy"
            //iconSource={{ uri: 'data:image/png;base64,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' }}
            onDateChange={input.onChange}
          />
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

DatePickerField.propTypes = {
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