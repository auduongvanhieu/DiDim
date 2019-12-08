import React from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import styles from './LoginForm.styles';
import InputField from '../Fields/InputField/InputField';
import { Images } from '../../../assets';
import { showPasswordAction, hidePasswordAction } from '../../../actions/OthersActions/actionCreators';
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

isNumber = (text) => {
    return !isNaN(text);
}

isEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(text);
}

isURL = (text) => {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(text);
}

const validate = (values, props) => {
    const errors = {};
    // if (!values.managed_url) {
    //     errors.managed_url = 'Please enter a managed url';
    // }

    // if (!values.user) {
    //     errors.user = 'Please enter the user id';
    // }

    // if (!values.password) {
    //     errors.password = 'Please enter a password';
    // }
    return errors;
}

export const warn = values => {
    const warnings = {};
    return warnings;
}

/**
 * Login
 * NOTE: Don't use this form in native-base's Content Tag. It's bad.
 * @param {*} props 
 * @param {Boolean} props.editable - Editable or not
 * @param {Boolean} props.hideSubmitButton - Hide submit button or not
 * @param {Boolean} props.hideClearButton - Hide clear button or not
 * @param {String} props.submitText - Submit button's text
 * @param {String} props.clearText - Clear button's text
 * @param {Function} props.onSubmit - Call submit action when form was validated successful
 */
function LoginForm(props) {
    const { } = props;
    return (
        <KeyboardAwareScrollView enableResetScrollToCoords={false}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>

                <Field
                    name={'managed_url'}
                    component={InputField}
                    placeholder={'Managed Url'}
                    label={'Managed Url'}
                    hideLabelInEditableMode={true}
                    leftImg={Images.icUser}
                    editable={props.editable}
                    keyboardType='default'
                    autoCapitalize='none'
                    returnKeyType={"next"}
                />

                <Field
                    name={'user'}
                    component={InputField}
                    placeholder={'User ID'}
                    label={'User ID'}
                    hideLabelInEditableMode={true}
                    leftImg={Images.icUser}
                    editable={props.editable}
                    keyboardType='default'
                    autoCapitalize='none'
                    returnKeyType={"next"}
                />

                <Field
                    name={'password'}
                    component={InputField}
                    placeholder={'Password'}
                    label={'Password'}
                    hideLabelInEditableMode={true}
                    leftImg={Images.icKey}
                    editable={props.editable}
                    keyboardType='default'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    onRightImgPress={() => {
                    }}
                    returnKeyType={"done"}
                />

                {props.hideSubmitButton ? null :
                    <TouchableOpacity style={styles.btnSubmit} onPress={props.handleSubmit(props.onSubmit || function () { })}>
                        <Text style={styles.btnSubmitText}>{props.submitText || "Submit"}</Text>
                    </TouchableOpacity>
                }
                {props.hideClearButton ? null :
                    <TouchableOpacity style={styles.btnClear} onPress={props.reset}>
                        <Text style={styles.btnClearText}>{props.clearText || "Clear"}</Text>
                    </TouchableOpacity>
                }
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

// Decorate with redux-form
LoginForm = reduxForm({
    form: 'LoginForm', // a unique identifier for this form
    validate,
    warn
})(LoginForm)

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default LoginForm;