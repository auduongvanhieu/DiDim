import { StyleSheet } from 'react-native';
import { normalize } from '../../../../utilities/ThemeUtils';

export default StyleSheet.create({
  input: {
    height: 30,
    padding: 5,  
  },
  inputContainer: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 6,
    padding: 6,
    margin: 8,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  valid: {
    borderColor: '#53E69D'
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