const CryptoJS = require("crypto-js");

// 32-characters-key
exports.key = 'Network-Security-Project-Senior'
//authentication(login)
//supervisors(post,put)req
//AES => Advanced Encryption Standard

exports.encryptData = (plainText) => {
    // JSON.stringify => converts json value to string
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(plainText), key).toString();
    return ciphertext;
}

exports.decryptData = (encryptedData) => {
    try {
        var bytes = CryptoJS.AES.decrypt(encryptedData, key);
        //enc => encoder
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    } catch (err) {
        console.error('Error during decryption:', err);
        return null; // Return null or handle error appropriately
    }
}

exports.handleData = (req, res, next) => {
    req.body = JSON.parse(exports.decryptData(req.body.data));
    console.log(req.body);
    next();
}