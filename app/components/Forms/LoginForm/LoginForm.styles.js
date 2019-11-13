import { StyleSheet } from 'react-native';
import { normalize } from '../../../utilities/ThemeUtils';

export default StyleSheet.create({
  container: {
  },
  btnSubmit: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 6,
    padding: 6,
    marginTop: 20,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  btnSubmitText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: normalize(15),
    padding: 5
  },
  btnClear: {
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
  btnClearText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: normalize(15),
    padding: 5
  }
});