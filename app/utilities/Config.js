const authURL = "http://oauth.didim365.com/API";
const baseURL = "http://managed.3-pod.com/API/Mobile.aspx";
const graphURL = "http://managed.dotnetpia.co.kr/monitor/graph.php";
const sAccessToken = "";
const userName = "";
const tabServerDetail = 2;
const fcmToken = "";
const objectToken = {};

const Config = {
  authURL,
  baseURL,
  graphURL,
  sAccessToken,
  userName,
  tabServerDetail,
  fcmToken,
  objectToken
};

const SuperObjects = {
  serverSelected: {
    os_gubn: "",
    status: "",
    ip: "",
    svr_no: "",
    guest_name: ""
  }
};

export { Config, SuperObjects };
