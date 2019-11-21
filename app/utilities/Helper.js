import { AsyncStorage } from 'react-native'
import { AppColors } from './Constants';
import { Images } from '../assets';

async function saveAuthCache(auth) {
    AsyncStorage.setItem('@MySuperStore:Authorize', JSON.stringify(auth));
}

async function getAuthCache() {
    const value = await AsyncStorage.getItem('@MySuperStore:Authorize');
    return JSON.parse(value);
}

async function clearAuthCache(auth) {
    AsyncStorage.removeItem('@MySuperStore:Authorize');
}

async function setAutoLogin(isAutoLogin) {
    AsyncStorage.setItem('@MySuperStore:AutoLogin', `${isAutoLogin}`);
}

async function getAutoLogin() {
    const value = await AsyncStorage.getItem('@MySuperStore:AutoLogin');
    return value;
}

async function setReceiveNotify(isReceiveNotify) {
    AsyncStorage.setItem('@MySuperStore:ReceiveNotify', `${isReceiveNotify}`);
}

async function getReceiveNotify() {
    const value = await AsyncStorage.getItem('@MySuperStore:ReceiveNotify');
    return value;
}

async function setObjectToken(data) {
    AsyncStorage.setItem('@MySuperStore:ObjectToken', JSON.stringify(data));
}

async function getObjectToken() {
    const value = await AsyncStorage.getItem('@MySuperStore:ObjectToken');
    return JSON.parse(value);
}

function generateStatusText(shortText){
    var text = ""
    switch(shortText){
        case "U": text = "UP"; break;
        case "D": text = "DOWN"; break;
        case "W": text = "WARN"; break;
        case "DK": text = "DISK"; break;
    }
    return text;
}

function generateStatusColor(shortText){
    var color = "blue"
    switch(shortText){
        case "U": color = AppColors.statusUp; break;
        case "D": color = AppColors.statusDown; break;
        case "W": color = AppColors.statusWarn; break;
        case "DK": color = AppColors.statusDisk; break;
    }
    return color;
}

function generateImageOS(shortText){
    var image = Images.ico_win
    switch(shortText){
        case "W": image = Images.ico_win; break;
        case "L": image = Images.ico_linux; break;
    }
    return image;
}

export {
    saveAuthCache,
    getAuthCache,
    clearAuthCache,
    setAutoLogin,
    getAutoLogin,
    setReceiveNotify,
    getReceiveNotify,
    setObjectToken,
    getObjectToken,
    generateStatusText,
    generateStatusColor,
    generateImageOS,
}