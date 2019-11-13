import { StyleSheet, Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const aspecRatio = screenHeight/screenWidth

export default StyleSheet.create({
    naviContainer: {
        backgroundColor: 'transparent',
        height: aspecRatio > 1.6 ? 60 : 80,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'    
    },

    linearGradient: {
        height: aspecRatio > 1.6 ? 60 : 80,
        borderBottomWidth: 0.5,
        borderBottomColor: "#bfbfbf",
        shadowColor: "#000000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    nozzaTitleContent: {
        height: 60,
        position: "absolute",
        width: screenWidth/2.5,
        left: screenWidth/2 - screenWidth/5,
        justifyContent: "center",
        alignItems: "center"
    },

    nozzaImage: {
        width: screenWidth/4,
        height: aspecRatio > 1.6 ? 30 : 70
    }
})