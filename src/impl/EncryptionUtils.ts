import {Md5} from "ts-md5";
// @ts-ignore
import * as bcrypt from "bcryptjs";
import * as cryptojs from 'crypto-js';

interface EncryptionUtilsInterface {
    /**
     * MD5 Encryption (32bit lower case)
     */
    md5(): string;

    /**
     * Password Encryption (slow salting hash)
     * @param username username that corresponds with the password
     */
    hashPasswd(username: string): string;

    sha256(): string;
}

export default class EncryptionUtilsImpl implements EncryptionUtilsInterface {
    private readonly _text: string;

    /**
     * Encryption Utils Constructor
     * @param text the string value that you want encrypt or decrypt
     */
    constructor(text: string) {
        if (!text) {
            throw new Error('The parameter \'text\' cannot be empty, you have to provide value');
        }
        this._text = text;
    }

    md5(): string {
        return Md5.hashStr(this._text).toString()
    }

    hashPasswd(username: string): string {
        const salt = '$2a$12$' + String(cryptojs.SHA256('AckyStack' + username + this._text)).substring(0, 22)
        return Md5.hashStr(bcrypt.hashSync(this._text, salt)).toString()
    }

    sha256(): string {
        return cryptojs.SHA256(this._text).toString()
    }
}
