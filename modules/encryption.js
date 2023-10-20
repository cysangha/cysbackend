var CryptoJS = require("crypto-js");
const secretKey = process.env.TRANSACTIONSECRETKEY;
const encryptObjForAPI = (value) => {
  let encJsonObj = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    secretKey
  ).toString();
  return encJsonObj;
};

const decryptObjFromAPI = (name) => {
  let bytes = CryptoJS.AES.decrypt(name, secretKey);
  let mainObj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return mainObj;
};

module.exports = {
  encryptObjForAPI,
  decryptObjFromAPI,
};
