const CryptoJS = require("crypto-js");

const key = 'Network-Security-Project-Senior'

exports.encryptData = (plainText) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(plainText), key).toString();
    return ciphertext;
}

exports.decryptData = (encryptedData) => {
    try {
        var bytes  = CryptoJS.AES.decrypt(encryptedData , key);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    } catch (err) {
        console.error('Error during decryption:', err);
        return null; // Return null or handle error appropriately
    }
}