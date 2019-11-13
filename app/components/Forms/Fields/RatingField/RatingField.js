import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import styles from "./RatingField.styles";
import PropTypes from "prop-types";
import TapRating from "../../../TapRating/TapRating";
import { ApplicationStyles } from "../../../../Resources/Themes";

/**
 * to be wrapped with redux-form Field component
 */
export default function RatingField(props) {
  const { input, meta, ...inputProps } = props;
  // do not display warning if the field has not been touched or if it's currently being edited
  const validationStyles =
    meta.touched && !meta.active
      ? meta.valid
        ? styles.valid
        : styles.invalid
      : null;
  const editable =
    String(inputProps.editable) === "true" ||
    String(inputProps.editable) === "undefined";
  //Switch between readable and editable mode
  if (editable)
    return (
      <View>
        {!inputProps.hideLabelInEditableMode ? (
          <Text style={ApplicationStyles.label}>{inputProps.label}</Text>
        ) : null}
        <View style={{ marginTop: 6, marginBottom: 6 }}>
          <TapRating
            count={5}
            defaultRating={input.value}
            size={20}
            showRating={false}
            onChange={input.onChange}
          />
        </View>
        {meta.touched && !meta.active ? (
          meta.invalid ? (
            <Text style={styles.txtError}>{meta.error}</Text>
          ) : null
        ) : null}
      </View>
    );
  else
    return (
      <View style={[styles.inputContainer, validationStyles]}>
        <Text style={ApplicationStyles.label}>{inputProps.label || inputProps.placeholder}</Text>
        <Text style={ApplicationStyles.value}>{input.value}</Text>
      </View>
    );
}

RatingField.propTypes = {
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
