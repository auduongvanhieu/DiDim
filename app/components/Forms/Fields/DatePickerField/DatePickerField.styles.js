import { StyleSheet } from 'react-native';
import { normalize } from '../../../../utilities/ThemeUtils';

export default StyleSheet.create({
  input: {
    height: 30,
    padding: 5,
  },
  inputContainer: {
    backgroundColor: 'rgba(137, 137, 137,0.05)',
    borderColor: 'transparent',
    borderWidth: 0.5,
    borderRadius: 6,
    marginBottom: 8
  },
  valid: {
    borderColor: '#ffffff'
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
    color: 'white'
  },
  dateIcon: {
    position: 'absolute',
    left: 8,
    top: 4,
    marginLeft: 0
  },
  dateInput: {
    marginLeft: 50,
    alignItems: 'flex-start',
    borderColor: 'transparent',
    color: '#394a63'
  },
  placeholderText: {
    fontSize: normalize(15),
    color: '#394a63',
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