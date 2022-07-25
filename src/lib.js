import * as crypto from "crypto-js";

const encrypt = (password, salt) => {
    return crypto.AES.encrypt(password, salt).toString();
};

const decrypt = (encryption, salt) => {
   let bytes = crypto.AES.decrypt(encryption, salt);
   let originalText = bytes.toString(crypto.enc.Utf8);

   return originalText;
};

export {encrypt, decrypt};