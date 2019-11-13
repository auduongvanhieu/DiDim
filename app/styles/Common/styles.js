import { StyleSheet, Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const aspecRatio = screenHeight / screenWidth

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: aspecRatio > 1.6 ? 15 : 24,
    },
    linearHeaderContainer: {
        height: aspecRatio > 1.6 ? 60 : 80,
        borderBottomWidth: 0.5,
        borderBottomColor: "#bfbfbf",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    headerContainer: {
        backgroundColor: 'transparent',
        height: aspecRatio > 1.6 ? 60 : 80,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomTabLine: {
        height: 1,
        bottom: aspecRatio > 1.6 ? 60 : 80,
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#FFF'
    },
    bottomTabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: aspecRatio > 1.6 ? 60 : 80,
        bottom: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#FFF'
    },
    animatedView: {
        width: "100%",
        backgroundColor: "#0a5386",
        elevation: 2,
        position: "absolute",
        bottom: 0,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    exitTitleText: {
        textAlign: "center",
        color: "#ffffff",
        marginRight: 10,
    },
    exitText: {
        color: "#e5933a",
        paddingHorizontal: 10,
        paddingVertical: 3
    }
})