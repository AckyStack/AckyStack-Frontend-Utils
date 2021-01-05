import {Md5} from "ts-md5/dist/md5";
import CryptoJS from 'crypto-js';
import * as bcrypt from "bcryptjs";

export default class EncryptionUtils {
    private readonly text: string;

    constructor(text: string) {
        if (!text) {
            throw new Error('The parameter \'text\' cannot be empty, you have to provide value');
        }
        this.text = text;
    }

    md5(): string {
        return Md5.hashStr(this.text).toString();
    }

    sha256(): string {
        return CryptoJS.SHA256(this.text).toString();
    }

    encryptPassword(username: string): string {
        const salt = '$2a$12$' + CryptoJS.SHA256('AckyStack' + username + this.text).toString().substring(0, 22)
        return Md5.hashStr(bcrypt.hashSync(this.text, salt)).toString();
    }
}
