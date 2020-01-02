import { Config } from "../utilities/Config";
import { aesEncrypt, aesDecrypt } from "../utilities/CryptoFuntion";
var axios = require("axios");
var qs = require("qs");
import {
  getObjectToken
} from "../utilities/Helper";

function* getToken(params) {
  const response = yield axios.get(Config.authURL + "/GetToken.aspx", {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });

  const result = yield response.status === 200 ? response.data : {};
  return result;
}

function* verify(params) {
  const objectToken = yield getObjectToken();
  Config.sAccessToken = objectToken.access_token;
  params.Par = aesEncrypt(params.Par,objectToken.secret_token);
  params.AccessToken = objectToken.access_token;
  
  const response = yield axios.post(Config.authURL + "/Verify.aspx",qs.stringify(params), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });

  const resultTemp = yield response.status === 200 ? response.data : {};
  const result = aesDecrypt(resultTemp, objectToken.secret_token)
  return result;
}

function* authorize(params) {
  const objectToken = yield getObjectToken();
  Config.sAccessToken = objectToken.access_token;
  params.Par = aesEncrypt(params.Par,objectToken.secret_token);
  params.AccessToken = objectToken.access_token;

  const response = yield axios.post(Config.authURL + "/Authorize.aspx",qs.stringify(params), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });

  const resultTemp = yield response.status === 200 ? response.data : {};
  const result = aesDecrypt(resultTemp, objectToken.secret_token)
  return result;
}


function* dispose(params) {
  const objectToken = yield getObjectToken();
  const response = yield axios.post(Config.authURL + "/Dispose.aspx",{AccessToken: objectToken.access_token}, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
  // console.log("__haha__",response.data);

  const resultTemp = yield response.status === 200 ? response.data : {};
  // const result = aesDecrypt(resultTemp, objectToken.secret_token)
  return resultTemp;
}

function* mainApi(params) {
  const objectToken = yield getObjectToken();
  params.Par = aesEncrypt(params.Par,objectToken.secret_token);
  params.AccessToken = objectToken.access_token;

  const response = yield axios.post(Config.baseURL, qs.stringify(params), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });

  const resultTemp = yield response.status === 200 ? response.data : {};
  const result = aesDecrypt(resultTemp, objectToken.secret_token)
  return result;
}

export const Api = {
  getToken,
  verify,
  authorize,
  dispose,
  mainApi
};
