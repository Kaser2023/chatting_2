import CryptoJS from 'crypto-js';

    export const hashString = (str) => {
      return CryptoJS.SHA256(str).toString();
    };
