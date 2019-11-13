var CryptoJS = require("crypto-js");

function aesEncrypt(message, key) {
  var encrypted = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding
  });

  return encrypted.toString();
}

function aesDecrypt(message, key) {
  var decrypted = CryptoJS.AES.decrypt(message, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

export {aesEncrypt, aesDecrypt}
