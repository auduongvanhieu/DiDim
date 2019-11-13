import React from 'react';
import { View, Text, Image } from 'react-native';
import { } from 'native-base';
import styles from './PickerField.styles';
import PropTypes from 'prop-types';
import { normalize } from '../../../../utilities/ThemeUtils';
import SectionedMultiSelect from '../../../MultiplePicker/sectioned-multi-select';

/**
 * to be wrapped with redux-form Field component
 */
export default function PickerField(props) {
    const { input, meta, ...inputProps } = props;
    // do not display warning if the field has not been touched or if it's currently being edited
    const validationStyles = meta.touched && !meta.active
        ? meta.valid ? styles.valid : styles.invalid
        : null;
    const editable = String(inputProps.editable) === 'true' || String(inputProps.editable) === 'undefined';
    const getKey = (items, key) => {
        var child = items[0].children;
        for (let i = 0; i < child.length; i++) {
            if (`${child[i].id}` === `${key}`)
                return child[i];
        }
        return {};
    }

    //Switch between readable and editable mode
    if (editable)
        return (
            <View style={inputProps.containerStyle}>
                {!inputProps.hideLabelInEditableMode ? <Text style={styles.label}>{inputProps.label}</Text> : null}
                <View style={[styles.inputContainer]}>
                    {inputProps.leftImg ? <Image resizeMode='stretch' source={inputProps.leftImg} style={styles.leftImg} /> : null}
                    <View style={{ flexGrow: 1 }}>
                        <SectionedMultiSelect
                            styles={{
                                backdrop: {
                                    justifyContent: 'center',
                                },
                                container: {
                                    width: '80%',
                                    height: '60%',
                                    marginTop: '30%',
                                    marginBottom: '-30%',
                                    flex: 0,
                                    alignSelf: 'center',
                                },
                                selectToggle: { paddingBottom: 0, paddingTop: 0 },
                                selectToggleText: { fontSize: normalize(15) },
                                selectedItemText: { fontSize: normalize(15) },
                                selectedSubItemText: { fontSize: normalize(15) },
                                subItemText: { fontSize: normalize(15) },
                                parentChipText: { fontSize: normalize(15) },
                                parentChipText: { fontSize: normalize(15) },
                                parentChipText: { fontSize: normalize(15) },
                                chipText: { fontSize: normalize(15) },
                                confirmText: { fontSize: normalize(15) },
                                button: {backgroundColor: '#005b7f',}
                            }}
                            items={props.items || []}
                            uniqueKey="id"
                            subKey="children"
                            iconKey="icon"
                            selectText={props.placeholder || "Choose some things..."}
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            selectedItems={input.value}
                            onSelectedItemsChange={(itemId) => {
                                input.onChange(itemId);
                            }}
                            {...inputProps}
                        />
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
    else {
        return (
            <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 8 }}>
                <Text style={styles.label}>{inputProps.label || inputProps.placeholder}</Text>
                <View style={{
                    width: 0,
                    flexGrow: 1,
                    flex: 1, justifyContent: 'center'
                }}>
                    <Text style={[styles.value, { flex: 1, flexWrap: 'wrap', textAlign: 'right' }]}>{props.insteadValue || getKey(props.items, input.value).name || input.value}</Text>
                </View>
            </View>
        );
    }
}



PickerField.propTypes = {
    containerStyle: PropTypes.any,
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