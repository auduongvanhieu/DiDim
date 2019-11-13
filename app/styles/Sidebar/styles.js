import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';
import { normalize } from '../../utilities/ThemeUtils';
import { AppColors, AppConstant } from '../../utilities/Constants';
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default StyleSheet.create({
    menuContainer: {
        backgroundColor: AppColors.menuBg,
        opacity: 0.96,
        paddingTop: 25,
        flex: 1
    },
    userProfiles: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    userImageStyle: {
        backgroundColor: '#9e9e9e',
        width: normalize(60),
        height: normalize(60),
        borderRadius: WIDTH * 0.10,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    userDetailsStyle: {
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
        height: 50,
        justifyContent: 'center',
        marginLeft: 16,
        marginRight: 16
    },
    userDetailsText: {
        fontSize: normalize(16),
        color: 'white',
        fontWeight: 'bold'
    },
    menuMainView: {
        flexGrow: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 0,
        //height: '100%'
    },
    listRow: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginBottom: normalize(0),
        // borderWidth: 0.5,
        // borderColor: AppColors.primaryColor,
        padding: 12,
        borderRadius: 8
    },
    rowTxt: {
        color: 'white',
        fontSize: AppConstant.textMenuSize,
        backgroundColor: 'transparent',
        marginLeft: normalize(30),
        textAlign: 'center',
        alignSelf: 'center'
    },
    imgIcon:{
        width: 30,
        height: 30
    }
});