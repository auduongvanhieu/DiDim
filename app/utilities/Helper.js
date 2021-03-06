import { AsyncStorage } from "react-native";
import { AppColors } from "./Constants";
import { Images } from "../assets";

async function saveAuthCache(auth) {
  AsyncStorage.setItem("@MySuperStore:Authorize", JSON.stringify(auth));
}

async function getAuthCache() {
  const value = await AsyncStorage.getItem("@MySuperStore:Authorize");
  return JSON.parse(value);
}

async function clearAuthCache(auth) {
  AsyncStorage.removeItem("@MySuperStore:Authorize");
}

async function setAutoLogin(isAutoLogin) {
  AsyncStorage.setItem("@MySuperStore:AutoLogin", `${isAutoLogin}`);
}

async function getAutoLogin() {
  const value = await AsyncStorage.getItem("@MySuperStore:AutoLogin");
  return value;
}

async function setReceiveNotify(isReceiveNotify) {
  AsyncStorage.setItem("@MySuperStore:ReceiveNotify", `${isReceiveNotify}`);
}

async function getReceiveNotify() {
  const value = await AsyncStorage.getItem("@MySuperStore:ReceiveNotify");
  return value;
}

async function setObjectToken(data) {
  AsyncStorage.setItem("@MySuperStore:ObjectToken", JSON.stringify(data));
}

async function getObjectToken() {
  const value = await AsyncStorage.getItem("@MySuperStore:ObjectToken");
  return JSON.parse(value);
}

async function setNotification(data) {
  var notifications = await getNotification();

  data.forEach(item => {
    if (notifications.filter(e => e.id == item.id).length == 0) {
      notifications.push(item);
    }
  });
  AsyncStorage.setItem(
    "@MySuperStore:Notification",
    JSON.stringify(notifications)
  );
}

async function updateNotification(data) {
  var notifications = await getNotification();

  notifications.map((item, index) => {
    if (item.id == data.id) {
      notifications[index].seen = true;
    }
  });
  AsyncStorage.setItem(
    "@MySuperStore:Notification",
    JSON.stringify(notifications)
  );
}

async function getNotification() {
  const value = await AsyncStorage.getItem("@MySuperStore:Notification");
  if (value) {
    return JSON.parse(value);
  }
  return [];
}

function generateStatusText(shortText) {
  var text = "";
  switch (shortText) {
    case "U":
      text = "UP";
      break;
    case "D":
      text = "DOWN";
      break;
    case "W":
      text = "WARN";
      break;
    case "DK":
      text = "DISK";
      break;
  }
  return text;
}

function generateStatusColor(shortText) {
  var color = "blue";
  switch (shortText) {
    case "U":
      color = AppColors.statusUp;
      break;
    case "D":
      color = AppColors.statusDown;
      break;
    case "W":
      color = AppColors.statusWarn;
      break;
    case "DK":
      color = AppColors.statusDisk;
      break;

    case "Up":
      color = AppColors.statusUp;
      break;
    case "Down":
      color = AppColors.statusDown;
      break;
    case "Warn":
      color = AppColors.statusWarn;
      break;
  }
  return color;
}

function generateNameColor(shortText) {
  var color = "blue";
  switch (shortText) {
    case "requestStatusNotice":
      color = "#666372";
      break;
    case "requestStatusRegistration":
      color = "#5A7BEF";
      break;
    case "requestStatusSolution":
      color = "#FF4D4D";
      break;
    case "requestStatusClose":
      color = "#14D2B8";
      break;
  }
  return color;
}

function generateCommentColor(shortText) {
  var color = "blue";
  switch (shortText) {
    case "requestStatusRegistration":
      color = "#43C7F1";
      break;
    case "requestStatusSolution":
      color = "#C3CDD9";
      break;
    case "requestStatusClose":
      color = "#C3CDD9";
      break;
  }
  return color;
}

function generateImageOS(shortText) {
  var image = Images.ico_win;
  switch (shortText) {
    case "V1":
      image = Images.ico_cloud;
      break;
    case "X1":
      image = Images.ico_win;
      break;
    case "W":
      image = Images.ico_win;
      break;
    case "L":
      image = Images.ico_linux;
      break;
  }
  return image;
}

function generateServerIcon(osGubn, serverGubn) {
  var image = Images.ico_win;
  switch (serverGubn) {
    case "V1":
      image = Images.ico_cloud;
      switch (osGubn) {
        case "W":
          image = Images.ico_cloud_win;
          break;
        case "L":
          image = Images.ico_cloud_linux;
          break;
      }
      break;
    case "X1":
      {
        switch (osGubn) {
          case "W":
            image = Images.ico_win;
            break;
          case "L":
            image = Images.ico_linux;
            break;
        }
      }
      break;
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
  setNotification,
  updateNotification,
  getNotification,
  generateStatusText,
  generateStatusColor,
  generateNameColor,
  generateCommentColor,
  generateImageOS,
  generateServerIcon
};
