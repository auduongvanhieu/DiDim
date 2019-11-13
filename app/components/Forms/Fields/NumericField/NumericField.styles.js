import { StyleSheet } from 'react-native';
import { normalize } from '../../../../utilities/ThemeUtils';

export default StyleSheet.create({
  input: {
    height: 30,
  },
  inputContainer: {
    height: 50,
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0.5,
    borderRadius: 6,
    marginBottom: 8,
  },
  leftImg: {
    height: 20,
    width: 22,
    marginRight: 11
  },
  valid: {
    borderColor: 'transparent'
  },
  invalid: {
    borderColor: '#F55E64'
  },
  txtError: {
    color: 'red',
    fontSize: normalize(12),
    margin: 6,
    textAlign: 'right'
  },
  txtLabel: {
    color: 'grey'
  },
  label: {
    color: '#005b7f',
    fontSize: normalize(14),
    fontWeight: 'bold'
  },
  value: {
    fontSize: normalize(16),
    color: '#000'
  }
});