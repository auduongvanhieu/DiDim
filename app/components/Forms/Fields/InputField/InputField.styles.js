import { StyleSheet } from 'react-native';
import { normalize } from '../../../../utilities/ThemeUtils';

export default StyleSheet.create({
  input: {
    height: 30,
  },
  inputContainer: {
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#e2e6ea',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 8,
    paddingLeft: 10
  },
  leftImg: {
    height: 24,
    width: 22,
    marginLeft: 11,
    marginRight: 11
  },
  rightImg: {
    height: 24,
    width: 22,
    marginLeft: 11,
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
    fontSize: normalize(16),
    fontWeight: 'bold'
  },
  value: {
    fontSize: normalize(16),
    color: '#000'
  }
});